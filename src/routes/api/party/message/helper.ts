import Filter from 'bad-words';
import { v4 as uuid } from 'uuid';
import { db } from '$lib/server/firebase';

const filter = new Filter();

export const addMessage = async ({ uid = '', message = '', alert = '', partyId = '' }) => {
	const newMessage = {
		message: message ? filter.clean(message) : undefined,
		alert,
		timestamp: Date.now(),
		uid
	};

	const blocks: Block[] = [];
	const ref = db.collection('parties').doc(partyId).collection('blocks');
	const snapshot = await ref.orderBy('createdAt', 'desc').limit(1).get();
	snapshot.forEach((doc) => blocks.push({ id: doc.id, ...doc.data() } as Block));

	if (snapshot.size && Object.values(blocks[0].messages).length < 1000) {
		await ref.doc(blocks[0].id).set({ messages: { [uuid()]: newMessage } }, { merge: true });
	} else {
		await ref.add({ createdAt: Date.now(), messages: { [uuid()]: newMessage } });
	}
};
