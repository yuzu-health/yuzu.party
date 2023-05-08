<script lang="ts">
	import { slide } from 'svelte/transition';
	import Camera from '$lib/components/icons/Camera.svelte';
	import X from '$lib/components/icons/X.svelte';
	import store from './store';

	$: src = $store.files?.[0] ? URL.createObjectURL($store.files?.[0]) : $store.image;

	const generateDateTimeLocal = (date?: Date | number) => {
		const d = date ? new Date(date) : undefined;
		if (!d) return '';
		return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
	};

	const minDate = generateDateTimeLocal(new Date());

	let showEnd = !!$store.end;
</script>

<svelte:head>
	<title>Create</title>
</svelte:head>

<div class="h-full">
	<div class="relative border-b border-panel">
		{#if src}
			<button
				type="button"
				class="absolute top-1 right-1 z-10"
				on:click={() => {
					$store.files = undefined;
					$store.image = '';
				}}
			>
				<X class="w-5 h-5" />
			</button>
		{/if}
		<label class="relative">
			{#if src}
				<img
					class="bg-dots h-56 w-full max-w-[32rem] object-cover text-primary text-opacity-30"
					src={$store.files?.[0] ? URL.createObjectURL($store.files?.[0]) : $store.image}
					alt="Cover"
				/>
			{:else}
				<div
					class="bg-dots h-56 w-full max-w-[32rem] text-primary text-opacity-30 flex items-center justify-center cursor-pointer"
				>
					<Camera class="w-6 h-6 text-opacity-100 text-primary" />
				</div>
			{/if}
			<input class="hidden" name="image" type="file" accept="image/*" bind:files={$store.files} />
		</label>
	</div>

	<div class="flex flex-col">
		<label class="flex border-b border-panel px-2">
			<div class="font-medium w-24 py-2 shrink-0">Name</div>
			<input class="w-full" required bind:value={$store.name} maxlength="50" placeholder="Name" />
		</label>

		<div class="flex overflow-hidden">
			<div class="flex border-b border-panel items-center px-2 w-full">
				<div class="font-medium w-24 py-2 shrink-0">Start</div>
				<input
					value={generateDateTimeLocal($store.date)}
					on:input={(e) => {
						// @ts-ignore
						const utcTime = e.target.valueAsNumber + new Date().getTimezoneOffset() * 60 * 1000;
						if (utcTime > new Date().getTime()) {
							store.update((store) => ({ ...store, date: utcTime }));
						} else {
							// @ts-ignore
							e.target.value = '';
						}
					}}
					placeholder="Start"
					min={minDate}
					class:opacity-30={!$store.date}
					class="w-full text-left h-10 accent-primary"
					type="datetime-local"
					required
				/>
			</div>
			<button
				type="button"
				class="whitespace-pre text-sm font-medium border-b px-2 border-panel"
				class:disabled={!$store.date}
				on:click={() => {
					showEnd = !showEnd;
					if (!showEnd) {
						store.update((store) => ({ ...store, end: undefined }));
					}
				}}
			>
				{showEnd ? '-' : '+'} End
			</button>
		</div>

		{#if showEnd}
			<div in:slide class="flex border-b border-panel items-center px-2 w-full">
				<div class="font-medium w-24 py-2 shrink-0">End</div>
				<input
					value={generateDateTimeLocal($store.end)}
					on:input={(e) => {
						// @ts-ignore
						const utcTime = e.target.valueAsNumber + new Date().getTimezoneOffset() * 60 * 1000;
						if (utcTime > new Date().getTime()) {
							store.update((store) => ({ ...store, end: utcTime }));
						} else {
							// @ts-ignore
							e.target.value = '';
						}
					}}
					placeholder="End"
					min={generateDateTimeLocal($store.date)}
					class="w-full text-left h-10 accent-primary"
					class:opacity-30={!$store.end}
					type="datetime-local"
				/>
			</div>
		{/if}

		<label class="flex border-b border-panel px-2">
			<div class="font-medium w-24 py-2 shrink-0">Location</div>
			<input class="w-full" bind:value={$store.location} placeholder="Location" maxlength="60" />
		</label>

		<label
			data-tooltip="Users have to be manually approved before they could RSVP"
			class="flex items-center border-b border-panel px-2 pr-3"
		>
			<div class="font-medium py-2 shrink-0">Require approval to join?</div>
			<input class="ml-auto" bind:checked={$store.requireApproval} type="checkbox" />
		</label>

		<div class="flex flex-grow py-2 px-2 h-full">
			<div class="font-medium w-24 shrink-0">Description</div>
			<div
				contenteditable="true"
				data-placeholder="Description"
				class="w-full resize-none h-full min-h-[3.5rem] outline-0"
				bind:textContent={$store.description}
				placeholder="Description"
			/>
		</div>
	</div>
</div>

<style>
	input {
		position: relative;
	}

	input::-webkit-calendar-picker-indicator {
		position: absolute;
		right: 0;
		width: 100%;
		height: 100%;
		background: none;
	}

	input::-webkit-date-and-time-value {
		text-align: left;
	}

	input::-webkit-date-and-time-value:empty:not(:focus) {
		content: 'Date';
	}
</style>
