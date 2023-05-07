import { auth } from '$lib/server/firebase';

export const load = async ({ url, locals, parent }) => {
	const uid = locals.session?.uid;
	const pathname = url.pathname;
	const { party } = await parent();

	if (party) {
		return {
			pathname,
			uid,
			party,
			streaming: {
				hostNames: Promise.all(
					party.hosts.map((uid: string) => auth.getUser(uid).then((user) => user.displayName))
				)
			}
		};
	}

	return { pathname, uid };
};
