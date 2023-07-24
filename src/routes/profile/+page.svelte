<script lang="ts">
	import { onMount } from 'svelte';
	import compress from 'browser-image-compression';

	import { invalidateAll } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { add } from '$lib/components/Toast';
	import ProfilePic from '$lib/components/ProfilePic.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import Camera from '$lib/components/icons/Camera.svelte';

	export let data;

	let files: FileList;
	let displayName = data.displayName || '';
	let saving = false;
	let parties: Party[] | undefined;

	const fetchParties = async () => {
		const resp = await fetch(
			`/api/party/list?startAfter=${parties?.[parties.length - 1]?.id || ''}`
		);
		parties = (parties || []).concat((await resp.json()).parties);
	};

	onMount(() => {
		fetchParties();
	});

	const onChangeSort = async (e: any) => {
		parties = undefined;
		const resp = await fetch(`/api/party/list?sort=${e.target.value}`);
		parties = (await resp.json()).parties;
	};

	async function profileChange() {
		saving = true;
		const formData = new FormData();
		formData.append('displayName', displayName);
		if (files?.[0]) {
			const compressedImage = await compress(files[0], { maxSizeMB: 1, maxWidthOrHeight: 200 });
			formData.append('profilePic', compressedImage);
		}

		try {
			await fetch('/api/profile', { method: 'POST', body: formData });
			if (files?.[0]) window.location.reload();
			else invalidateAll();
			add('Profile updated!');
		} catch (e) {
			add('Error updating profile');
			console.error(e);
		}

		saving = false;
	}

	const onLogout = async () => {
		await auth.signOut();
		await fetch('/api/auth', { method: 'DELETE' });
		invalidateAll();
	};

	$: src = files?.[0] && URL.createObjectURL(files[0]);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<Layout>
	<div
		class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 -mr-[1px] flex flex-col"
		slot="col1"
	>
		<div class="yuzui flex">
			<span class="font-medium p-2 flex flex-row items-center w-full">Parties</span>
			<span class="float-right pr-2 whitespace-pre">
				<span class="font-light opacity-50">Sort By</span>
				<select class="h-10 text-primary accent-primary" on:change={onChangeSort}>
					<option selected value="all"> All </option>
					<option value="upcoming">Upcoming</option>
					<option value="hosting">Hosting</option>
				</select>
			</span>
		</div>

		<div
			class="h-full yuzui yuzui-column"
			on:scroll={(e) => {
				// @ts-ignore
				if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
					fetchParties();
				}
			}}
		>
			{#if !parties}
				<div class="flex-grow yuzui flex items-center justify-center">fetching...</div>
			{:else}
				{#each parties as party, i}
					<a class="yuzui p-2 w-full" href="/{party.id}">
						<div class="w-[100%] text-ellipsis overflow-hidden mb-2 font-medium">
							{party.name}
						</div>

						<div class="w-[100%] opacity-50">
							<div>
								{new Date(party?.date).toLocaleString('en-US', {
									weekday: 'long',
									month: 'long',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									timeZoneName: 'short'
								})}
							</div>
							{#if party.location}
								<div class="overflow-hidden text-ellipsis mt-1">
									{party.location}
								</div>
							{/if}
						</div>
					</a>
				{/each}
				<div class="flex-grow yuzui" />
			{/if}
		</div>
		<a href="/" class="yuzui sticky bottom-0 text-center yuzui-bg-dots -mt-[1px]">
			<span class="px-2 bg-light font-semibold">Create a party</span>
		</a>
	</div>

	<form
		class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 flex flex-col"
		slot="col2"
		on:submit|preventDefault={profileChange}
	>
		<div class="yuzui-row">
			<div class="yuzui p-2 font-medium w-full -mr-[1px]">Profile</div>
			<button type="button" class="yuzui whitespace-pre" on:click={onLogout}> Sign out </button>
		</div>

		<div class="yuzui !border-b-0 overflow-y-auto h-full -mt-[1px] p-4 flex gap-4 flex-col">
			<div class="inline-block">
				<label class="relative cursor-pointer">
					<div class="h-20 w-20 absolute left-0 top-0 flex items-center justify-center">
						<span class="bg-light">
							<Camera class="h-10 w-10 p-1" />
						</span>
					</div>

					<ProfilePic
						class="h-20 w-20 yuzui-bg-dots border border-current object-cover"
						{src}
						uid={data?.uid}
					/>
					<input class="hidden" name="avatar" type="file" accept="image/*" bind:files />
				</label>
			</div>

			<input
				required
				maxlength="20"
				class="focus-visible:outline-0 border-b inline-block pb-1"
				bind:value={displayName}
			/>
		</div>

		<button
			class="yuzui"
			disabled={!displayName || (displayName === data?.displayName && !files?.[0])}
			class:loading={saving}
		>
			Save Profile
		</button>
	</form>
</Layout>
