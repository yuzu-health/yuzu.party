import { db } from '$lib/server/firebase';

export const load = async ({ url, locals, params }) => {
	if (params.type === 'edit' && params.partyId) {
		const party = await db.collection('parties').doc(params.partyId).get();
		const data = party.data();

		return {
			pathname: url.pathname,
			loggedIn: !!locals.session,
			party: { id: party.id, ...data } as Partial<Party>
		};
	}

	return { pathname: url.pathname, loggedIn: !!locals.session };
};
