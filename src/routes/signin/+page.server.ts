import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.session?.uid) redirect(303, '/profile');
};
