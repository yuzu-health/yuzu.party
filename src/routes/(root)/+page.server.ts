import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.session?.uid) {
		return redirect(302, '/profile');
	} else {
		return redirect(302, '/create');
	}
};
