import { db, auth } from '$lib/server/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { addMessage } from './helper';
import { text } from '$lib/server/twilio';

export const POST = async ({ request, locals, url }) => {
	const { message, partyId, textAlert } = await request.json();

	const partyGet = await db.collection('parties').doc(partyId).get();
	const party = partyGet.data() as Party;

	if (!locals.session?.uid || !message || !partyId) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (textAlert) {
		if (!party?.hosts.includes(locals.session?.uid)) {
			return new Response('Unauthorized', { status: 401 });
		}

		Object.entries(party.attendees).forEach(async ([uid, { status }]) => {
			if (status === 'no') return;

			const user = await auth.getUser(uid);

			if (user.phoneNumber) {
				await text(
					user.phoneNumber,
					`New message for ${party.name}:
						\n${message}
						\nhttps://${url.host}/${partyId}`
				);
			}
		});

		await addMessage({ uid: locals.session?.uid, message, partyId, alert: 'texted everyone' });
	} else {
		if (['yes', 'maybe'].includes(party?.attendees[locals.session?.uid]?.status)) {
			await addMessage({ uid: locals.session?.uid, message, partyId });
		}
	}

	return new Response('OK');
};

export const DELETE = async ({ request, locals }) => {
	const { partyId, messageId, blockId } = await request.json();

	if (!partyId || !messageId) {
		return new Response('Missing parameters', { status: 400 });
	}

	const ref = db.collection('parties').doc(partyId);
	const snapshot = await ref.get();
	const party = snapshot.data();

	const blockSnapshot = await ref.collection('blocks').doc(blockId).get();
	const block = blockSnapshot.data() as Block;

	if (
		!party?.hosts.includes(locals.session?.uid) &&
		block?.messages[messageId]?.uid !== locals.session?.uid
	) {
		return new Response('Unauthorized', { status: 401 });
	}

	await ref
		.collection('blocks')
		.doc(blockId)
		.update({ [`messages.${messageId}`]: FieldValue.delete() });

	return new Response('OK');
};
