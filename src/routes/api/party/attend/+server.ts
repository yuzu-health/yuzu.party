import { db, auth } from '$lib/server/firebase';
import { addMessage } from '../message/helper';
import { text } from '$lib/server/twilio';
import { FieldValue } from 'firebase-admin/firestore';

export const POST = async ({ request, locals, url }) => {
	const isLoggedIn = !!locals.session?.uid;
	const { partyId, uid = locals.session?.uid, status } = await request.json();
	const newStatus = status as 'yes' | 'no' | 'maybe' | 'block' | 'request' | 'host';
	const ref = db.collection('parties').doc(partyId);
	const partyGet = await ref.get();
	const party = partyGet.data() as Party;
	const currentStatus = party?.attendees?.[uid]?.status;
	const isHost = party?.hosts.includes(locals.session?.uid);
	const selfChange = uid === locals.session?.uid;
	const isBlocked = party?.attendees?.[locals.session?.uid]?.status === 'block';
	const user = await auth.getUser(uid);

	if (
		!isLoggedIn ||
		isBlocked ||
		party?.createdBy === uid ||
		(!selfChange && !isHost) ||
		(!isHost && ['block', 'host'].includes(newStatus)) ||
		newStatus === currentStatus ||
		!['yes', 'no', 'maybe', 'block', 'request', 'host'].includes(newStatus) ||
		!user.phoneNumber
	) {
		return new Response('Unauthorized', { status: 401 });
	}

	const update = {
		[`attendees.${uid}`]: {
			status: newStatus === 'host' ? 'yes' : newStatus,
			timestamp: Date.now(),
			name: user.displayName || '',
			alerted: newStatus === 'yes' || undefined
		},
		hosts: newStatus === 'host' ? FieldValue.arrayUnion(uid) : FieldValue.arrayRemove(uid),
		guests: ['yes', 'maybe', 'host'].includes(newStatus)
			? FieldValue.arrayUnion(uid)
			: FieldValue.arrayRemove(uid)
	};

	await ref.update(update);
	const alert = !selfChange
		? ''
		: newStatus === 'yes'
			? 'is attending'
			: newStatus === 'maybe'
				? 'might attend'
				: newStatus === 'no'
					? 'is not attending'
					: '';
	if (alert) await addMessage({ uid, alert, partyId });

	const date = new Date(party?.date).toLocaleString('en-US', {
		timeZone: party?.timezone,
		timeZoneName: 'short'
	});

	if (newStatus === 'yes') {
		await text(
			user.phoneNumber,
			`You're attending: ${party?.name}, on ${date}!
					\nhttps://${url.host}/${partyId}`
		);
	} else if (newStatus === 'host') {
		await text(
			user.phoneNumber,
			`You're hosting: ${party?.name}, on ${date}!
					\nhttps://${url.host}/${partyId}`
		);
	} else if (newStatus === 'request') {
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
};
