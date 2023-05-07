import { db } from '$lib/server/firebase';

const filterAttendees = (attendees: Party['attendees'], uid: string) =>
	Object.entries(attendees).reduce((acc, [key, value]) => {
		const val = value as undefined | { status?: string };
		if (val && ['yes', 'maybe'].includes(val?.status || '')) (acc as any)[key] = value;
		if (key === uid) (acc as any)[key] = value;
		return acc;
	}, {});

export const load = async ({ url, locals, params }) => {
	const uid = locals.session?.uid;
	const pathname = url.pathname;

	if (params.slug) {
		const partyGet = await db.collection('parties').doc(params.slug).get();
		const party = partyGet.data();

		if (!party) return { pathname, uid };

		const isHost = party?.hosts.includes(uid);
		const isAttending = ['yes', 'maybe'].includes(party?.attendees[uid]?.status);

		return {
			pathname,
			uid,
			party: {
				id: partyGet.id,
				...party,
				attendees: !uid ? {} : isHost ? party.attendees : filterAttendees(party.attendees, uid),
				location: isAttending ? party?.location : 'hidden'
			} as Party
		};
	}

	return { pathname, uid };
};
