import { writable } from 'svelte/store';

export const create = <T>(initialValue: T) => {
	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		set,
		update,
		reset: () => set(initialValue)
	};
};
