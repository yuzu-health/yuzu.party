import { db, auth } from '$lib/server/firebase';
import { addMessage } from '../message/helper';
import { text } from '$lib/server/twilio';
import { FieldValue } from 'firebase-admin/firestore';

export const POST = async ({ request, locals, url }) => {
	if (!locals.session?.uid) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { partyId, uid = locals.session?.uid, status: oldStatus } = await request.json();

	const ref = db.collection('parties').doc(partyId);
	const partyGet = await ref.get();
	const party = partyGet.data();

	const currentStatus = party?.attendees?.[uid]?.status;
	const isHost = party?.hosts.includes(locals.session?.uid);

	if (currentStatus === 'block' && !isHost) {
		return new Response('Unauthorized', { status: 401 });
	}

	const status = ['yes', 'no', 'maybe', 'block', 'request'].includes(oldStatus) ? oldStatus : 'no';

	if (currentStatus === status) return new Response('OK');

	if (status === 'request' && ['yes', 'maybe'].includes(currentStatus)) return new Response('OK');

	const alert =
		status === 'yes'
			? 'is attending'
			: status === 'maybe'
			? 'might attend'
			: status === 'no'
			? 'is not attending'
			: '';

	const user = await auth.getUser(uid);

	const update = {
		[`attendees.${uid}`]: {
			status,
			timestamp: Date.now(),
			name: user.displayName || '',
			alerted: status === 'yes' || undefined
		},
		guests: ['yes', 'maybe'].includes(status)
			? FieldValue.arrayUnion(uid)
			: FieldValue.arrayRemove(uid)
	};

	if (isHost || locals.session?.uid === uid) {
		await ref.update(update);
		if (alert) await addMessage({ uid, alert, partyId });

		const date = new Date(party?.date).toLocaleString('en-US', {
			timeZone: party?.timezone,
			timeZoneName: 'short'
		});

		if (!user.phoneNumber) return new Response('OK');

		if (status === 'yes') {
			await text(
				user.phoneNumber,
				`You're attending: ${party?.name}, on ${date}!
					\nhttps://${url.host}/${partyId}`
			);
		} else if (status === 'request') {
			await text(
				user.phoneNumber,
				`You requested to attend: ${party?.name}, on ${date}!
					\nhttps://${url.host}/${partyId}`
			);

			for (const host of party?.hosts || []) {
				const hostUser = await auth.getUser(host);
				if (hostUser.phoneNumber) {
					await text(
						hostUser.phoneNumber,
						`${user.displayName} requested to attend: ${party?.name}
							\nhttps://${url.host}/${partyId}/people?sort=status`
					).catch(console.error);
				}
			}
		}

		return new Response('OK');
	}

	return new Response('Unauthorized', { status: 401 });
};
