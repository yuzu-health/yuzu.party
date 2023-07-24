<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	import Layout from '$lib/components/Layout.svelte';
	import { add } from '$lib/components/Toast/store';
	import Widget from '../signin/widget.svelte';
	import Marker from '$lib/components/icons/Marker.svelte';
	import Edit from '$lib/components/icons/Edit.svelte';
	import Calendar from '$lib/components/icons/Calendar.svelte';
	import User from '$lib/components/icons/User.svelte';
	import ExternalLink from '$lib/components/icons/ExternalLink.svelte';

	export let data;

	$: pathname = data.pathname;
	$: loggedIn = data?.uid;

	let status: string | undefined;
	let showSection = '';

	const onSubmit = async (newStatus?: string, force = false) => {
		if (newStatus) status = newStatus;

		if (!loggedIn && !force) {
			setTimeout(() => (showSection = 'login'), 100);
			return;
		}

		const resp = await fetch('/api/party/attend', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ partyId: data.party?.id, status })
		});

		if (!resp.ok) {
			status = data.party?.attendees?.[data.uid]?.status;
			add('Something went wrong');
		}

		if (newStatus === 'request') add("You've requested to join");

		showSection = '';
		await invalidateAll();
	};

	onMount(() => {
		status = data.party?.attendees?.[data.uid]?.status;
	});

	const onShare = () => {
		if (navigator.share) {
			navigator.share({
				title: data.party?.name,
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			add('Link copied to clipboard');
		}
	};

	const generateDateString = (date?: number) =>
		!date
			? ''
			: new Date(date).toLocaleString(undefined, {
					weekday: 'short',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
			  });

	$: startTime = data.party?.date ? generateDateString(data.party?.date) : 'hidden';
	$: endTime =
		startTime.split(' at ')[0] === generateDateString(data.party?.end).split(' at ')[0]
			? generateDateString(data.party?.end).split(' at ')[1]
			: generateDateString(data.party?.end);

	$: timezone = new Date()
		?.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' })
		?.substring(4)
		?.match(/\b(\w)/g)
		?.join('');
</script>

<svelte:head>
	<title>{data.party?.name}</title>
	<meta name="description" content={data.party?.description} />
	<meta property="og:title" content={data.party?.name} />
	<meta property="og:description" content={data.party?.description} />
	<meta property="og:image" content={data.party?.image} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.party?.name} />
	<meta name="twitter:description" content={data.party?.description} />
	<meta name="twitter:image" content={data.party?.image} />
</svelte:head>

<Layout>
	<div slot="col1" class="flex flex-col h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 z-10">
		<div class="yuzui overflow-y-auto flex flex-col h-full">
			{#if data.party?.image}
				<img
					class="w-full h-56 object-cover border-b border-panel"
					alt="Cover"
					src={data.party?.image}
				/>
			{/if}

			<div class="p-4 flex flex-col gap-4">
				<div class="font-semibold text-xl whitespace-pre-wrap">{data.party?.name}</div>
				{#if data.party?.date}
					<div class="text-primary text-opacity-75 flex items-center min-w-[50%] flex-wrap">
						<Calendar class="w-4 h-4 mr-2" />

						{startTime}

						{#if data.party?.end}
							<span class="mx-2">-</span>
							{endTime}
						{/if}

						({timezone})
					</div>
				{/if}
				{#if data.party?.location}
					<div class="text-primary text-opacity-75 flex">
						<Marker class="w-4 h-5 mr-2 shrink-0" />
						{data.party?.location}
					</div>
				{/if}
				<div class="flex items-center gap-1 text-primary text-opacity-75">
					<User class="w-4 h-4" />
					<div class="">Hosted by</div>
					{data?.hostnames?.join(', ')}
				</div>
				<div class="flex flex-wrap items-start gap-x-4">
					<button
						class="flex items-center text-primary text-opacity-70 hover:text-opacity-100 transition-colors"
						type="button"
						on:click={onShare}
					>
						<ExternalLink class="w-4 h-4 mr-1" />
						Share
					</button>

					{#if data.party?.hosts.includes(data.uid)}
						<div>
							<a
								class="inline-flex items-center gap-2 opacity-75 hover:opacity-100"
								href={`/edit/${data.party?.id}`}
							>
								<Edit class="w-4 h-4" />
								Edit
							</a>
						</div>
					{/if}
				</div>

				<div class="whitespace-pre-wrap">{data.party?.description || ''}</div>
			</div>
		</div>

		<div class="z-0 sticky bottom-0 shrink-0 -mt-[1px]">
			{#if showSection === 'login'}
				<Widget on:signin={() => onSubmit(undefined, true)} />
			{:else if data?.party?.requireApproval && !['yes', 'maybe'].includes(status || '')}
				<button
					on:click={async () => onSubmit('request')}
					class="yuzui -mr-[1px] h-12 w-full"
					class:pressed={status === 'request'}
				>
					Request to join
				</button>
			{:else}
				<div class="yuzui-row w-full h-12 font-semibold">
					{#each ['yes', 'maybe', 'no'] as option, i}
						<button
							on:click={async () => onSubmit(option)}
							class="yuzui w-full {i === 2 ? '' : '-mr-[1px]'} capitalize"
							class:pressed={status === option}
						>
							{option}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<div slot="col2" class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 -ml-[1px] z-10">
		{#key pathname}
			<div
				in:fly|local={{ duration: 500, y: 20, opacity: 0 }}
				class="relative flex flex-col h-full"
			>
				<slot />
			</div>
		{/key}
	</div>
</Layout>
