export const load = async ({ url, locals }) => {
	const uid = locals.session?.uid;
	const pathname = url.pathname;
	return { pathname, uid };
};
