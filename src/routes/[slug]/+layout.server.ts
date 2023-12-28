import { auth, db } from '$lib/server/firebase';

export const load = async ({ url, locals, params }) => {
	const uid = locals?.session?.uid;
	const pathname = url?.pathname;

	const partyGet = await db.collection('parties').doc(params.slug).get();
	const partyData = partyGet.data();

	if (!partyData) return {};

	const isHost = partyData?.hosts.includes(uid);
	const isAttending = ['yes', 'maybe'].includes(partyData?.attendees[uid]?.status);

	const party = {
		id: partyGet.id,
		...partyData,
		attendees: !uid ? {} : isHost ? partyData.attendees : filterAttendees(partyData.attendees, uid),
		location: isAttending ? partyData?.location : 'hidden'
	} as Party;

	let hostnames: string[] = [];
	try {
		hostnames = await Promise.all(
			(party?.hosts || []).map(async (uid: string) =>
				auth.getUser(uid).then((user) => user?.displayName || '')
			)
		);
	} catch (error) {
		console.error(error);
	}

	return { pathname, uid, party, hostnames };
};

const filterAttendees = (attendees: Party['attendees'], uid: string) =>
	Object.entries(attendees).reduce(
		(acc, [key, value]) => {
			const val = value as undefined | { status?: string };
			if (val && ['yes', 'maybe'].includes(val?.status || '')) acc[key] = value;
			if (key === uid) acc[key] = value;
			return acc;
		},
		{} as Party['attendees']
	);
