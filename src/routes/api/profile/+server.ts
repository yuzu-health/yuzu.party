import { storage, auth } from '$lib/server/firebase';

export const POST = async ({ request, locals }) => {
	if (!locals.session?.uid) {
		return new Response(null, { status: 401 });
	}

	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	if (data.profilePic) {
		const buffer = await (data.profilePic as Blob).arrayBuffer();
		const bf = Buffer.from(buffer);
		const file = storage.bucket().file(locals.session.uid + '/avatar');
		await file.save(bf);
	}

	if (data.displayName) {
		await auth.updateUser(locals.session.uid, { displayName: data.displayName as string });
	}

	return new Response('OK');
};
