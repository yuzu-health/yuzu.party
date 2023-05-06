import { db } from '$lib/server/firebase';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals, url }) => {
	const uid = locals.session?.uid;
	const sort = url.searchParams.get('sort') || 'all';
	const startAfter = url.searchParams.get('startAfter') || '';

	if (!uid) {
		return json({ parties: [], uid });
	}

	let parties: FirebaseFirestore.Query;

	if (sort === 'hosting') {
		parties = db
			.collection('parties')
			.where('hosts', 'array-contains', uid)
			.orderBy('createdAt', 'desc');
	} else if (sort === 'upcoming') {
		parties = db
			.collection('parties')
			.where('guests', 'array-contains', uid)
			.orderBy('date', 'asc')
			.where('date', '>', Date.now());
	} else {
		parties = db
			.collection('parties')
			.where('guests', 'array-contains', uid)
			.orderBy('createdAt', 'desc');
	}

	if (startAfter) {
		parties = parties.startAfter(await db.collection('parties').doc(startAfter).get());
	}

	const data = await parties.limit(10).get();

	const partiesData = data.docs.map((doc) => {
		const data = doc.data() as Partial<Party>;
		return { id: doc.id, ...data };
	});

	return json({ parties: partiesData });
};
