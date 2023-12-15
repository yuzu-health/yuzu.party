<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import type { ConfirmationResult } from 'firebase/auth';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

	import { add } from '$lib/components/Toast';
	import { cleave } from '$lib/utils';
	import { auth } from '$lib/firebase';

	let phoneNumber = '';
	let code = '';
	let loading = false;
	let result: { confirmationResult: ConfirmationResult; ok: boolean };
	let name = '';
	let countryCode = '1';

	let phoneRef: HTMLInputElement;
	let nameRef: HTMLInputElement;
	let codeRef: HTMLInputElement;

	const dispatch = createEventDispatcher();

	onMount(() => {
		phoneRef?.focus();
		window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-div', { size: 'invisible' });
		window.recaptchaVerifier.render();
		return () => {
			window.recaptchaVerifier.clear();
		};
	});

	const onSubmit = async () => {
		loading = true;
		try {
			result = await onPhoneSubmit('+' + countryCode + phoneNumber);
			await tick();
			if (nameRef) nameRef.focus();
			else if (codeRef) codeRef.focus();
		} catch (e) {
			console.log(e);
			add('There was an issue verifiying your number');
		}
		loading = false;
	};

	const onPhoneSubmit = async (phone: string) => {
		const appVerifier = window.recaptchaVerifier;
		const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
		const resp = await fetch('/api/auth', { headers: { 'x-phone-number': phone } });
		const { message } = await resp.json();
		return { confirmationResult, ok: message === 'ok' };
	};

	const onCodeSubmit = async (
		code: string,
		name: string,
		confirmationResult: ConfirmationResult
	) => {
		const userCred = await confirmationResult.confirm(code);
		await fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, idToken: await userCred.user.getIdToken() })
		});
		return userCred;
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
						countryCode = e.target.textContent;
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
		<button class="yuzui" class:loading> Sign In </button>
	</form>
{:else}
	<form
		class="yuzui-column"
		on:submit|preventDefault={async () => {
			loading = true;

			try {
				await onCodeSubmit(code, name, result.confirmationResult);
				dispatch('signin');
			} catch (e) {
				code = '';
				add('Invalid code');
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
			/>
		</div>
		<button class="yuzui" class:loading> Confirm </button>
	</form>
{/if}

<div id="recaptcha-div" />
