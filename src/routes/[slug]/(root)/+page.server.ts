import { auth } from '$lib/server/firebase';

export const load = async ({ locals }) => {
	try {
		const token = await auth.createCustomToken(locals.session?.uid);
		return {
			token,
			uid: locals.session?.uid
		};
	} catch (e) {
		return {};
	}
};
