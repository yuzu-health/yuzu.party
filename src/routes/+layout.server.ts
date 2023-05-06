export const load = ({ url, locals }) => {
	return { pathname: url.pathname, uid: locals?.session?.uid };
};
