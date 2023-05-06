export function timeSince(date: Date) {
	const seconds = Math.floor((+new Date() - +date) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
}

import Cleave from 'cleave.js';
import type { CleaveOptions } from 'cleave.js/options';

export function cleave(node: HTMLElement, options: CleaveOptions) {
	let cleave: Cleave;

	function destroy() {
		cleave && cleave.destroy();
	}

	function update(options: CleaveOptions) {
		if (!options) return cleave && destroy();
		cleave && destroy();
		cleave = new Cleave(node, options);
	}

	update(options);

	return { update, destroy };
}
