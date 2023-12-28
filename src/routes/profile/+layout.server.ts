import { auth } from '$lib/server/firebase';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/firebase';

export const load = async ({ locals }) => {
	const uid = locals.session?.uid;

	if (!uid) {
		redirect(303, '/signin');
	}

	return {
		uid,
		displayName: (await auth.getUser(uid)).displayName,
		mutuals: findMutuals(uid)
	};
};

const findMutuals = async (uid: string) => {
	const parties = await db.collection('parties').where('guests', 'array-contains', uid).get();
	const allGuests = parties.docs.reduce((acc, doc) => {
		const data = doc.data();
		return [...acc, ...data.guests];
	}, [] as string[]);

	// uid to number of times they appear in allGuests
	const counts = allGuests.reduce(
		(acc, guest) => {
			return { ...acc, [guest]: (acc[guest] || 0) + 1 };
		},
		{} as Record<string, number>
	);

	// order by number of times they appear in allGuests and get first 5
	const sorted = Object.entries(counts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 6)
		.filter((a) => a[0] !== uid)
		.filter(([, count]) => count > 1);

	// get names
	const users = await Promise.all(sorted.map(([uid]) => auth.getUser(uid)));

	const final = [];
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		final.push({ name: user.displayName, uid: user.uid, count: sorted[i][1] });
	}

	return final;
};
