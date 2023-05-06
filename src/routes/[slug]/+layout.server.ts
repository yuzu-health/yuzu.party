import { db, auth } from '$lib/server/firebase';

export const load = async ({ url, locals }) => {
	const uid = locals.session?.uid;
	const id = url.pathname.split('/')[1] || '';
	const partyGet = await db.collection('parties').doc(id).get();
	const party = partyGet.data();

	const isHost = party?.hosts.includes(uid);
	const isAttending = ['yes', 'maybe'].includes(party?.attendees[uid]?.status);

	if (party) {
		return {
			pathname: url.pathname,
			uid,
			party: {
				id: partyGet.id,
				...party,
				attendees: !uid
					? {}
					: isHost
					? party.attendees
					: Object.entries(party.attendees).reduce((acc, [key, value]) => {
							const val = value as undefined | { status?: string };
							if (val && ['yes', 'maybe'].includes(val?.status || '')) (acc as any)[key] = value;
							if (key === uid) (acc as any)[key] = value;
							return acc;
					  }, {}),
				location: isAttending ? party.location : 'hidden'
			} as Party,
			streaming: {
				hostNames: Promise.all(
					party.hosts.map((uid: string) => auth.getUser(uid).then((user) => user.displayName))
				)
			}
		};
	}

	return {
		pathname: url.pathname,
		uid
	};
};
