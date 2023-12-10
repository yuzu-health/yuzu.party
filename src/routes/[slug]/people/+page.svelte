<script lang="ts">
	import ProfilePic from '$lib/components/ProfilePic.svelte';
	import { page } from '$app/stores';
	import { timeSince } from '$lib/utils';

	export let data;

	let pageRef: HTMLElement;
	let sort = $page.url.searchParams.get('sort') || 'name';
	let showNum = 20;
	let isHost = $page.data.party?.hosts.includes($page.data.uid);

	const ranking = { request: 'a', yes: 'b', maybe: 'c', no: 'd', blocked: 'e' };

	$: attendees = Object.entries(($page.data.party as Party)?.attendees || {}).sort((a, b) => {
		if (sort === 'name') return a[1].name?.localeCompare(b[1].name);
		// @ts-ignore
		else if (sort === 'status') return ranking[a[1].status]?.localeCompare(ranking[b[1].status]);
		else if (sort === 'time') return b[1].timestamp - a[1].timestamp;
		else return 0;
	});

	$: {
		sort;
		showNum = 20;
	}
</script>

<div class="yuzui-row">
	<a
		data-sveltekit-noscroll
		href={$page.data.pathname.split('/').slice(0, -1).join('/')}
		class="yuzui !px-3 h-10 w-10 shrink-0"
	>
		{'<-'}
	</a>
	<div class="yuzui !border-r-0 p-2 pl-4 w-full h-10">
		<div class="font-semibold">People</div>
	</div>
	<div class="yuzui !border-l-0 pr-8 flex items-center h-10">
		<div class="shrink-0 opacity-50 pr-1">Sort by</div>
		<select
			class="border-0 font-medium cursor-pointer text-center h-9 text-primary accent-primary"
			bind:value={sort}
		>
			<option value="name">Name</option>
			<option value="status">Status</option>
			<option value="time">Time</option>
		</select>
	</div>
</div>

<div
	bind:this={pageRef}
	class="h-full overflow-y-auto yuzui !border-t-0"
	on:scroll={() => {
		if (
			showNum < attendees.length &&
			pageRef.scrollTop + pageRef.clientHeight >= pageRef.scrollHeight
		) {
			showNum += 20;
		}
	}}
>
	{#each attendees.slice(0, showNum) as attendee, i}
		<div class="border-b flex gap-2 -ml-[1px] items-center">
			<ProfilePic
				class="h-10 w-10 shrink-0 inline-block border-r object-cover yuzui-bg-dots text-xs"
				uid={attendee[0]}
				name={attendee[1].name}
			/>
			<div class="w-full flex flex-wrap items-center py-2">
				<div class="mr-2 overflow-hidden text-ellipsis whitespace-pre">
					{attendee[1].name}
				</div>
				<span class="opacity-50 shrink-0 text-sm">{timeSince(new Date(attendee[1].timestamp))}</span
				>
			</div>
			{#if isHost}
				<div>
					{data.numbers?.[attendee[0]]}
				</div>

				<select
					class="text-right h-10 pr-2 font-medium underline cursor-pointer appearance-none accent-primary"
					style="direction: ltr;"
					value={attendee[1].status}
					on:change={(e) => {
						fetch('/api/party/attend', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								partyId: $page.data.party.id,
								uid: attendee[0],
								// @ts-ignore
								status: e.target.value
							})
						});
					}}
				>
					<option value="yes">Yes</option>
					<option value="maybe">Maybe</option>
					<option value="no">No</option>
					<option value="block">Block</option>
					<option disabled value="request">Requested</option>
				</select>
			{/if}
		</div>
	{/each}
</div>
