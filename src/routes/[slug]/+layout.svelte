<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	import { Layout, Marker, Edit, Calendar, User, ExternalLink } from '$lib/components';
	import { toast } from '@zerodevx/svelte-toast';
	import Widget from '../signin/widget.svelte';

	export let data;

	$: pathname = data.pathname;
	$: loggedIn = data?.uid;

	let status: string | undefined;
	let showSection = '';
	let showRSVP = false;

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
			toast.push('Something went wrong');
		}

		if (newStatus === 'request') toast.push("You've requested to join");

		showSection = '';
		showRSVP = false;
		await invalidateAll();
	};

	onMount(() => {
		status = data.party?.attendees?.[data.uid]?.status;
	});

	const onShare = () => {
		const partyURL = window.location.origin + '/' + data.party?.id;

		if (navigator.share) {
			navigator.share({ title: data.party?.name, url: partyURL });
		} else {
			navigator.clipboard.writeText(partyURL);
			toast.push('Link copied to clipboard');
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
	<div slot="col1" class="flex flex-col h-[calc(100%-90px)] sm:max-h-[36rem] mt-[5px] sm:mt-0 z-10">
		<div class="yuzui overflow-y-auto flex flex-col h-full">
			{#if data.party?.image}
				<img
					class="w-full h-56 aspect-[5/2] object-cover border-b border-panel sticky top-0"
					alt="Cover"
					src={data.party?.image}
				/>
			{/if}

			<div class="p-4 flex flex-col gap-4">
				<div class="font-semibold text-xl whitespace-pre-wrap">{data.party?.name}</div>
				{#if data.party?.date}
					<div class="text-primary/75 flex items-center min-w-[50%] flex-wrap">
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
					<div class="text-primary/75 flex">
						<Marker class="w-4 h-5 mr-2 shrink-0" />
						{data.party?.location}
					</div>
				{/if}
				<div class="flex items-center gap-1 text-primary/75">
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

				<div class="whitespace-pre-wrap break-words">{data.party?.description || ''}</div>
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
			{:else if ['yes', 'maybe', 'no'].includes(status || '') && !showRSVP}
				<button
					class="yuzui -mr-[1px] h-12 w-full"
					on:click={() => (showRSVP = true)}
					data-tooltip="Click to change your status"
					in:fly|local={{ duration: 500, y: 5, opacity: 0 }}
				>
					You're a {status}!
				</button>
			{:else}
				<div
					class="yuzui-row w-full h-12 font-semibold"
					in:fly|local={{ duration: 500, y: 5, opacity: 0 }}
				>
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

	<div slot="col2" class="h-[calc(100%-90px)] sm:max-h-[36rem] mt-[5px] sm:mt-0 -ml-[1px] z-10">
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
