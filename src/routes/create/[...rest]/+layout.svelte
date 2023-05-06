<script lang="ts">
	import { fly } from 'svelte/transition';
	import compress from 'browser-image-compression';
	import { goto } from '$app/navigation';
	import store from './store';
	import Widget from '../../signin/widget.svelte';

	export let data;

	let showLogin = false;
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
						maxWidthOrHeight: 500
					});

					formData.append('image', compressedFiled);
				}
			} else {
				formData.append(key, JSON.stringify(value));
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

<div class="flex flex-col items-center justify-center w-full h-screen max-w-screen-xs mx-auto p-2">
	<div class="flex flex-col h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 w-full">
		<form
			id="create-party"
			class="w-full h-full flex-grow overflow-y-auto basic-panel"
			on:submit|preventDefault={() => {
				if (!data.loggedIn) return (showLogin = true);
				onSubmit();
			}}
		>
			<slot />
		</form>
		{#if showLogin}
			<div in:fly|local={{ y: 10 }} class="sticky bottom-0 -mt-[1px] w-full">
				<Widget on:signin={onSubmit} />
			</div>
		{:else}
			<button
				form="create-party"
				class="sticky bottom-0 basic-button w-full -mt-[1px] fixed-right"
				class:pointer-events-none={!ready}
				class:loading
			>
				<span class:opacity-30={!ready}>Create</span>
			</button>
		{/if}
	</div>
</div>
