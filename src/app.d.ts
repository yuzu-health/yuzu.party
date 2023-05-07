// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { RecaptchaVerifier, DecodedIdToken } from 'firebase/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: DecodedIdToken;
		}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		recaptchaVerifier: RecaptchaVerifier;
	}

	interface Party {
		id: string;
		name: string;
		date: number;
		end?: number;
		location: string;
		description: string;
		image: string;
		createdBy: string;
		guests: string[];
		guestStatuses: Record<string, string>;
		status: string;
		timezone: string;
		maxSpots: number;
		hosts: string[];
		alerted: boolean;
		requireApproval?: boolean;
		urlHost: string;
		attendees: {
			[uid: string]: {
				name: string;
				status: string;
				timestamp: number;
			};
		};
	}
}

export {};
