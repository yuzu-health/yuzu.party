import { auth } from '$lib/server/firebase';

export const load = async ({ parent, locals }) => {
	const { party } = await parent();

	if (!party?.hosts.includes(locals.session.uid)) {
		return {};
	}

	const attendeeIds = Object.keys(party?.attendees || {});

	const numbers = await Promise.all(
		attendeeIds.map(async (uid: string) => {
			const user = await auth.getUser(uid);
			return [uid, (user?.phoneNumber as string) || ''];
		})
	);

	return { numbers: Object.fromEntries(numbers) };
};
