import { auth } from '$lib/server/firebase';

export const load = async ({ locals }) => {
	try {
		return { token: await auth.createCustomToken(locals.session?.uid) };
	} catch (e) {
		return {};
	}
};
