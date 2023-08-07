<script lang="ts">
	import Trash from '$lib/components/icons/Trash.svelte';
	import { fly } from 'svelte/transition';
	import compress from 'browser-image-compression';
	import { goto } from '$app/navigation';
	import store from './store';
	import Widget from '../../signin/widget.svelte';

	export let data;

	let showLogin = false;
	let showDelete = false;
	let loading = false;

	$: {
		data.pathname;
		store.set({ ...data.party });
	}

	const onSubmit = async () => {
		loading = true;
		showLogin = false;

		const formData = new FormData();
		for (const [key, value] of Object.entries($store)) {
			if (key === 'files') {
				if ($store.files?.[0]) {
					const compressedFiled = await compress($store.files?.[0], {
						maxSizeMB: 2,
						maxWidthOrHeight: 700
					});

					formData.append('image', compressedFiled);
				}
			} else {
				formData.append(key, JSON.stringify(value || null));
			}
		}

		formData.append('timezone', JSON.stringify(Intl.DateTimeFormat().resolvedOptions().timeZone));

		const resp = await fetch('/api/party/create', { method: 'POST', body: formData });
		const { id } = await resp.json();

		$store = {};

		goto(`/${id}`);
	};

	$: ready = $store.name && $store.date;
</script>

<div class="flex flex-col items-center justify-center w-full h-screen max-w-screen-xs mx-auto px-2">
	<div class="yuzui-column h-[calc(100%-90px)] max-h-[34rem] mt-[5px] sm:mt-0 w-full">
		<form
			id="create-party"
			class="w-full shrink flex-grow yuzui-column yuzui !border-b-0"
			on:submit|preventDefault={() => {
				if (!data.loggedIn) return (showLogin = true);
				onSubmit();
			}}
		>
			<slot />
		</form>

		{#if showLogin}
			<div in:fly|local={{ y: 10 }} class="sticky bottom-0 w-full">
				<Widget on:signin={onSubmit} />
			</div>
		{:else if showDelete}
			<div class="yuzui-row">
				<button
					class="yuzui w-full -mr-[1px]"
					type="button"
					on:click={async () => {
						loading = true;

						await fetch(`/api/party/create`, {
							method: 'DELETE',
							body: JSON.stringify({ partyId: data?.party?.id })
						});

						loading = false;
						$store = {};
						goto('/profile');
					}}
				>
					Confirm delete?
				</button>
				<button class="yuzui w-full" on:click={() => (showDelete = false)}>Cancel</button>
			</div>
		{:else}
			<div class="yuzui-row">
				<button
					form="create-party"
					class="sticky bottom-0 yuzui w-full fixed-right"
					class:pointer-events-none={!ready}
					class:loading
				>
					<span class:opacity-30={!ready}>{data.party ? 'Save' : 'Create'}</span>
				</button>
				{#if data.party}
					<button type="button" on:click={() => (showDelete = true)} class="yuzui !px-3">
						<Trash class="w-4 h-4" />
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
