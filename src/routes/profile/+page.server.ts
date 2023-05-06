import { auth } from '$lib/server/firebase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const uid = locals.session?.uid;

	if (!uid) {
		throw redirect(303, '/signin');
	}

	return {
		uid,
		streaming: {
			displayName: auth.getUser(uid).then((user) => user.displayName)
		}
	};
};
