import { writable } from 'svelte/store';

const party = writable<Partial<Party> & { files?: FileList }>({});

export default party;
