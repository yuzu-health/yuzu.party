import { auth } from '$lib/server/firebase';

export const load = async ({ url, locals, parent }) => {
	const uid = locals?.session?.uid;
	const pathname = url?.pathname;
	const { party } = await parent();

	let hostnames: string[];

	try {
		hostnames = await Promise.all(
			(party?.hosts || []).map(async (uid: string) => {
				const user = await auth.getUser(uid);
				return (user?.displayName as string) || '';
			})
		);
	} catch (error) {
		hostnames = [];
	}

	if (party) {
		return { pathname, uid, party, hostnames };
	}

	return { pathname, uid };
};
