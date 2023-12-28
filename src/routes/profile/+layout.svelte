<script lang="ts">
	import { fade } from 'svelte/transition';
	import compress from 'browser-image-compression';
	import { invalidateAll } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { toast } from '@zerodevx/svelte-toast';
	import { ProfilePic, Layout, Camera } from '$lib/components';

	export let data;

	let files: FileList;
	let displayName = data.displayName || '';
	let saving = false;

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
			toast.push('Profile updated!');
		} catch (e) {
			toast.push('Error updating profile');
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
	<slot slot="col1" />

	<form
		class="h-[calc(100%-90px)] sm:max-h-[36rem] mt-[5px] sm:mt-0 flex flex-col"
		slot="col2"
		on:submit|preventDefault={profileChange}
	>
		<div class="yuzui-row">
			<div class="yuzui p-2 font-medium w-full -mr-[1px]">Profile</div>
			<button type="button" class="yuzui whitespace-pre !px-4" on:click={onLogout}>
				Sign out
			</button>
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

			{#await data.mutuals then mutuals}
				<div in:fade class="space-y-1 mt-4">
					{#each mutuals as mutual}
						<div class="flex items-center gap-2">
							<ProfilePic class="h-6 w-6 border" uid={mutual.uid} />
							{mutual.name}
							<span class="opacity-50"
								>{mutual.count} mutual {mutual.count === 1 ? 'party' : 'parties'}</span
							>
						</div>
					{/each}
				</div>
			{/await}
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
