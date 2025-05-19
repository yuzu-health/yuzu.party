<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import type { ConfirmationResult } from 'firebase/auth';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

	import { toast } from '@zerodevx/svelte-toast';
	import { cleave } from '$lib/utils';
	import { auth } from '$lib/firebase';

	let phoneNumber = '';
	let code = '';
	let loading = false;
	let result: { confirmationResult: ConfirmationResult; ok: boolean } | null = null;
	let name = '';
	let countryCode = '1';
	let recaptchaVerifier: RecaptchaVerifier | null = null;

	let phoneRef: HTMLInputElement;
	let nameRef: HTMLInputElement;
	let codeRef: HTMLInputElement;

	const dispatch = createEventDispatcher();

	onMount(() => {
		phoneRef?.focus();
		initializeRecaptcha();

		return () => {
			resetRecaptcha();
		};
	});

	const initializeRecaptcha = () => {
		try {
			resetRecaptcha();

			recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-div', {
				size: 'invisible',
				'expired-callback': () => {
					// Reset if expired
					resetRecaptcha();
					initializeRecaptcha();
					toast.push('Verification expired, please try again');
				}
			});
		} catch (error) {
			console.error('reCAPTCHA initialization error:', error);
			toast.push('Error setting up verification');
		}
	};

	// Reset reCAPTCHA
	const resetRecaptcha = () => {
		if (recaptchaVerifier) {
			try {
				recaptchaVerifier.clear();
			} catch (error) {
				console.error('Error clearing reCAPTCHA:', error);
			}
			recaptchaVerifier = null;
		}

		const recaptchaDiv = document.getElementById('recaptcha-div');
		if (recaptchaDiv) recaptchaDiv.innerHTML = '';
	};

	const onSubmit = async () => {
		loading = true;

		try {
			// Ensure we have a fresh reCAPTCHA instance
			if (!recaptchaVerifier) {
				initializeRecaptcha();
				await tick();
			}

			// Format phone with country code
			const formattedPhone = '+' + countryCode + phoneNumber.replace(/\D/g, '');

			result = await onPhoneSubmit(formattedPhone);
			await tick();

			// Focus the appropriate field after successful submission
			if (nameRef) nameRef.focus();
			else if (codeRef) codeRef.focus();
		} catch (error: any) {
			console.error('Phone verification error:', error);
			const errorMessage = error?.message || 'There was an issue verifying your number';
			toast.push(errorMessage);

			// Reset reCAPTCHA for another attempt
			resetRecaptcha();
			initializeRecaptcha();
		}

		loading = false;
	};

	const onPhoneSubmit = async (phone: string) => {
		if (!recaptchaVerifier) throw new Error('reCAPTCHA not initialized');

		try {
			const appVerifier = recaptchaVerifier;
			const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);

			// Check with backend
			const resp = await fetch('/api/auth', {
				headers: { 'x-phone-number': phone },
				method: 'GET'
			});

			if (!resp.ok) {
				throw new Error('Server validation failed');
			}

			const { message } = await resp.json();
			return { confirmationResult, ok: message === 'ok' };
		} catch (error) {
			// Reset reCAPTCHA on error
			resetRecaptcha();
			initializeRecaptcha();
			throw error;
		}
	};

	const onCodeSubmit = async (
		verificationCode: string,
		userName: string,
		confirmationResult: ConfirmationResult
	) => {
		try {
			const userCred = await confirmationResult.confirm(verificationCode);

			// Update user profile on backend
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: userName,
					idToken: await userCred.user.getIdToken()
				})
			});

			if (!response.ok) throw new Error('Failed to update user profile');

			return userCred;
		} catch (error) {
			// Pass the error up to be handled by the caller
			throw error;
		}
	};

	// Function to reset the form and start over
	const resetForm = () => {
		result = null;
		code = '';
		loading = false;
		resetRecaptcha();
		initializeRecaptcha();
		phoneRef?.focus();
	};
</script>

{#if !result}
	<form class="yuzui-column" on:submit|preventDefault={onSubmit}>
		<div class="flex items-center yuzui gap-2 px-2">
			<div class="flex">
				+
				<span
					class="px-1 focus-visible:outline-0"
					contenteditable="true"
					role="textbox"
					on:input={(e) => {
						// @ts-ignore
						e.target.textContent = e.target.textContent.replace(/\D/g, '');
						// @ts-ignore
						e.target.textContent = e.target.textContent.slice(0, 3);
						// @ts-ignore
						countryCode = e.target.textContent || '1'; // Default to 1 if empty
					}}
				>
					1
				</span>
				<input class="hidden" name="countryCode" bind:value={countryCode} />
			</div>
			<input
				bind:this={phoneRef}
				name="phone"
				required
				class="w-full border-b-0 py-2"
				placeholder="(111) 111-1111"
				bind:value={phoneNumber}
				use:cleave={{
					delimiters: ['(', ') ', '-'],
					blocks: [0, 3, 3, 4],
					numericOnly: true
				}}
			/>
		</div>
		<button type="submit" class="yuzui" class:loading disabled={loading}> Sign In </button>
	</form>
{:else}
	<form
		class="yuzui-column"
		on:submit|preventDefault={async () => {
			loading = true;

			try {
				if (!result) throw new Error('No confirmation result available');
				await onCodeSubmit(code, name, result.confirmationResult);
				dispatch('signin');
			} catch (error) {
				console.error('Code verification error:', error);
				code = '';
				toast.push('Invalid code');
				loading = false;
			}
		}}
	>
		{#if !result?.ok}
			<div class="yuzui">
				<input
					bind:this={nameRef}
					required
					class="p-2 w-full"
					name="name"
					placeholder="Your name"
					bind:value={name}
				/>
			</div>
		{/if}
		<div class="yuzui">
			<input
				bind:this={codeRef}
				required
				class="p-2 w-full"
				name="confirmation-code"
				placeholder="Confirmation Code"
				maxlength="6"
				bind:value={code}
				pattern="[0-9]*"
				inputmode="numeric"
			/>
		</div>
		<div class="flex gap-2">
			<button type="button" class="yuzui secondary" on:click={resetForm}> Back </button>
			<button type="submit" class="yuzui grow" class:loading disabled={loading}> Confirm </button>
		</div>
	</form>
{/if}

<div id="recaptcha-div" />
