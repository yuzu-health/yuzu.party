import { db, storage, auth } from '$lib/server/firebase';
import { v4 as uuid } from 'uuid';
import { addMessage } from '../message/helper';

export const POST = async ({ request, locals }) => {
	if (!locals.session) return new Response('Unauthorized', { status: 401 });

	const formData = await request.formData();
	const body = Object.fromEntries(formData);

	Object.entries(body).forEach(([key, value]) => {
		if (typeof value !== 'string') return;
		body[key] = JSON.parse(value);
	});

	if (!body.name || !body.date) {
		return new Response('Missing name or date', { status: 400 });
	}

	if (body.image && typeof body.image !== 'string') {
		const buffer = await (body.image as Blob).arrayBuffer();
		const bf = Buffer.from(buffer);
		const file = storage.bucket().file(locals.session.uid + '/parties/' + uuid());
		await file.save(bf);
		const image = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
		body.image = image[0];
	}

	if (body.id) {
		const ref = db.collection('parties').doc(body.id as string);
		const party = await ref.get();

		if (party.exists) {
			const data = party.data();

			if (new Date(data?.date).getTime() < Date.now()) {
				return new Response('Party has already happened', { status: 400 });
			}

			if (data?.hosts.includes(locals.session.uid)) {
				await ref.update({ ...body });
				return new Response(JSON.stringify({ id: body.id }));
			} else {
				return new Response('Unauthorized', { status: 401 });
			}
		}
	}

	const user = await auth.getUser(locals.session.uid);

	const newParty = await db.collection('parties').add({
		...body,
		attendees: {
			[locals.session.uid]: { status: 'yes', timestamp: Date.now(), name: user.displayName || '' }
		},
		alerted: false,
		createdAt: Date.now(),
		createdBy: locals.session.uid,
		guests: [locals.session.uid],
		hosts: [locals.session.uid]
	});

	await addMessage({ uid: locals.session.uid, alert: 'is attending', partyId: newParty.id });

	return new Response(JSON.stringify({ id: newParty.id }));
};

export const DELETE = async ({ request, locals }) => {
	const { partyId } = await request.json();

	const ref = db.collection('parties').doc(partyId);
	const snapshot = await ref.get();
	const party = snapshot.data();

	if (!party) {
		return new Response('Party not found', { status: 404 });
	}

	if (party.hosts.includes(locals.session.uid)) {
		await ref.delete();
		return new Response('OK');
	}

	return new Response('Unauthorized', { status: 401 });
};
