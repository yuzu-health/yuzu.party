<script lang="ts">
	import { add } from '$lib/components/Toast';
	import { page } from '$app/stores';
	import Send from '$lib/components/icons/Send.svelte';
	import Phone from '$lib/components/icons/Phone.svelte';

	let clazz = '';
	export { clazz as class };
	let message = '';
	let sending = false;
	let textAlert = false;

	const onSubmit = async () => {
		sending = true;

		try {
			await fetch('/api/party/message', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ partyId: $page.data.party?.id, message, textAlert })
			});
		} catch (e) {
			add('Error sending message');
		}

		sending = false;
		message = '';
		textAlert = false;
	};
</script>

<form on:submit|preventDefault={onSubmit} class="{clazz} yuzui-row">
	<div class="yuzui w-full">
		<input
			class="h-full w-full flex-grow !px-4"
			placeholder="type a message..."
			bind:value={message}
			required
		/>
	</div>
	{#if $page?.data?.party?.hosts?.includes($page?.data?.uid)}
		<button
			data-tooltip="Make message a text alert"
			type="button"
			class="yuzui !px-2"
			on:click={() => (textAlert = !textAlert)}
		>
			<Phone class="w-6 h-6 {!textAlert ? 'opacity-50' : ''}" />
		</button>
	{/if}
	<button
		type="submit"
		class="yuzui after:!right-[14px] !px-3"
		class:loading={sending}
		class:disabled={!$page?.data?.party?.attendees?.[$page?.data?.uid]?.status}
	>
		<Send class={`w-4 h-5 ${sending ? 'opacity-0' : ''}`} />
	</button>
</form>
