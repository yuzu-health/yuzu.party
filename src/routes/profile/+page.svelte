<script lang="ts">
	import { onMount } from 'svelte';

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
</script>

<div class="h-[calc(100%-90px)] sm:max-h-[36rem] mt-[5px] sm:mt-0 -mr-[1px] yuzui-column">
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
		class="yuzui yuzui-column grow"
		on:scroll={(e) => {
			// @ts-ignore
			if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
				fetchParties();
			}
		}}
	>
		{#if !parties?.length}
			<div class="grow yuzui flex items-center justify-center h-full">fetching...</div>
		{:else}
			{#each parties as party, i}
				<a class="yuzui block p-2 w-full" href="/{party.id}">
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
		{/if}
	</div>

	<a href="/create" class="yuzui sticky bottom-0 text-center yuzui-bg-dots -mt-[1px]">
		<span class="px-2 bg-light font-semibold">Create a party</span>
	</a>
</div>
