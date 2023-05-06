import { db, auth } from '$lib/server/firebase';
import { text } from '$lib/server/twilio';

export const GET = async ({ url }) => {
	const now = new Date();
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	now.setDate(now.getDate() + 1);
	const timestamp = now.getTime();

	const later = new Date();
	later.setMinutes(0);
	later.setHours(later.getHours() + 1);
	later.setSeconds(0);
	later.setMilliseconds(0);
	later.setDate(later.getDate() + 1);
	const laterTimestamp = later.getTime();

	const parties = await db
		.collection('parties')
		.where('date', '>=', timestamp)
		.where('date', '<', laterTimestamp)
		.where('alerted', '!=', true)
		.get();

	const partyData = parties.docs.map((party) => {
		const data = party.data();
		return { id: party.id, ...data } as Party;
	});

	Object.entries(partyData).forEach(async ([id, party]) => {
		if (!party.attendees) return;

		for (const [uid, { status }] of Object.entries(party.attendees)) {
			if (status === 'no') continue;

			const user = await auth.getUser(uid);

			await text(
				user.phoneNumber,
				`Reminder: You have the party, ${party.name}, tomorrow!
        \nhttps://${url.host}/${party.id}
        `
			);
		}

		await db.collection('parties').doc(id).update({ alerted: true });
	});

	return new Response('OK');
};
