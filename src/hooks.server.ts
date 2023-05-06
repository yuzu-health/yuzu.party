import { auth } from '$lib/server/firebase';

export const handle = async ({ event, resolve }) => {
	try {
		const token = await event.cookies.get('session');
		event.locals.session = await auth.verifySessionCookie(token || '', true);
	} catch (e) {
		event.locals.session = null;
	}

	return await resolve(event);
};
