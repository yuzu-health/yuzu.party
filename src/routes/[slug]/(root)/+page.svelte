<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { signInWithCustomToken } from 'firebase/auth';
	import { collection, onSnapshot, query } from 'firebase/firestore';

	import { db, auth } from '$lib/firebase';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { timeSince } from '$lib/utils';
	import { ProfilePic, Trash } from '$lib/components';
	import Submit from './Submit.svelte';

	export let data;

	$: attending = Object.entries(data.party?.attendees || {}).filter(
		([, { status }]) => status === 'yes'
	);
	$: numAttending = attending.length;

	let messageRef: HTMLDivElement;
	let messages: undefined | any[] = undefined;
	let messageLimit = 30;
	let showScrollBottom = false;
	let loadingMessage = 'fetching...';
	let deletedMessages: { [key: string]: boolean } = {};

	const fetchMessages = async () => {
		loadingMessage = 'fetching...';

		if (!data.token || !data.party?.id || !data.party.attendees?.[data.uid]?.status) {
			messages = undefined;
			loadingMessage = 'RSVP to see and send messages';
			return;
		} else if (data.party.attendees?.[data.uid]?.status === 'request') {
			loadingMessage = 'Waiting for host approval';
		}

		if (!auth.currentUser) await signInWithCustomToken(auth, data.token);

		const q = query(collection(db, 'parties', data.party?.id, 'blocks'));
		const unsubscribe = onSnapshot(q, async (snap) => {
			const blocks: Block[] = [];
			snap.forEach((doc) => blocks.push({ id: doc.id, ...doc.data() } as Block));
			const cleanedMessages = blocks
				.map(({ messages, id: blockId }) =>
					Object.entries(messages).map(([id, message]) => ({ id, blockId, ...message }))
				)
				.flat()
				.sort((a, b) => a.timestamp - b.timestamp);

			const behavior = !messages ? 'auto' : 'smooth';
			const shouldScroll =
				!messages || messageRef?.scrollTop + messageRef?.clientHeight === messageRef?.scrollHeight;

			messages = cleanedMessages;
			await tick();

			if (shouldScroll) {
				messageRef?.scrollTo({ top: messageRef.scrollHeight, behavior });
			} else {
				showScrollBottom = true;
			}
		});

		return () => unsubscribe();
	};

	const onDeleteMessage = async (blockId: string, messageId: string) => {
		deletedMessages[messageId] = true;
		try {
			await fetch('/api/party/message', {
				method: 'DELETE',
				body: JSON.stringify({ partyId: data.party?.id, blockId, messageId })
			});
		} catch (e) {
			deletedMessages[messageId] = false;
			console.error(e);
		}
	};

	$: {
		data;
		if (browser) fetchMessages();
	}
</script>

<div class="flex justify-between items-center font-medium -mb-[1px]">
	<div class="yuzui pl-4 h-10 w-full -mr-[1px] flex items-center border-b-0">Activity</div>
	{#if data?.party?.attendees?.[data.uid]?.status}
		{#each attending.splice(0, 3) as [id, { name }]}
			<ProfilePic class="w-10 h-10 yuzui -mr-[1px] object-cover yuzui-bg-dots" uid={id} {name} />
		{/each}
		<a
			data-sveltekit-noscroll
			href={$page.data.pathname + '/people'}
			class="h-10 yuzui flex items-center whitespace-nowrap border-b-0 !px-2"
		>
			<div class="text-sm">{numAttending} attending</div>
		</a>
	{/if}
</div>

<div
	bind:this={messageRef}
	on:scroll={async () => {
		if (messages && messages?.length > messageLimit && messageRef.scrollTop <= 0) {
			const oldHeight = messageRef.scrollHeight;
			messageLimit += 30;
			await tick();
			messageRef?.scrollTo({ top: messageRef.scrollHeight - oldHeight });
		}

		if (messageRef.scrollTop + messageRef.clientHeight === messageRef.scrollHeight) {
			showScrollBottom = false;
		}
	}}
	class="h-full yuzui overflow-y-auto !border-b-0"
>
	{#if typeof messages === 'undefined'}
		<div
			transition:fade|local={{ duration: 300 }}
			class="p-4 flex items-center justify-center h-full font-medium"
		>
			{loadingMessage}
		</div>
	{:else if messages.length}
		<div in:fade|local={{ delay: 300 }}>
			{#each messages.slice(-messageLimit) as message (message.id)}
				{#if data.party?.attendees?.[message.uid]?.status !== 'block' && !deletedMessages[message.id]}
					<div class="group flex border-b" class:pointer-events-none={message.hidden}>
						<ProfilePic
							uid={message.uid}
							name={data.party?.attendees?.[message.uid]?.name || ''}
							class="shrink-0 h-16 w-16 object-cover "
						/>
						<div class="p-2 border-l w-full">
							<div class="flex items-center gap-2 w-full flex-wrap">
								<span class="text-sm font-semibold" class:bg-primary={message.hidden}>
									{data.party?.attendees?.[message.uid]?.name || '???'}
								</span>
								{#if data.party?.hosts.includes(message.uid)}
									<span class="text-sm font-medium text-accent"> HOST </span>
								{/if}
								<span class="text-sm font-light text-primary/50" class:bg-primary={message.hidden}>
									{timeSince(new Date(message.timestamp))} ago
								</span>
								{#if data.party?.hosts.includes(data.uid) || (data.uid === message.uid && !message.alert)}
									<button
										class="group-hover:opacity-100 opacity-0 ml-auto transition-opacity active:!opacity-50"
										on:click={() => onDeleteMessage(message.blockId, message.id)}
									>
										<Trash class="h-3 w-3" />
									</button>
								{/if}
							</div>
							{#if message.alert}
								<div class="mt-1 opacity-50 italic">{message.alert}</div>
							{/if}
							{#if message.message}
								<div class="mt-1" class:bg-primary={message.hidden}>{message.message}</div>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<div in:fade|local={{ duration: 300 }} class="p-4 flex items-center justify-center h-full">
			no messages yet
		</div>
	{/if}
</div>

{#if showScrollBottom}
	<div
		transition:fade|local={{ duration: 100 }}
		class="absolute bottom-16 left-1/2 -translate-x-1/2"
	>
		<button
			class="yuzui !text-sm !px-2"
			on:click={() => {
				showScrollBottom = false;
				messageRef.scrollTo({ top: messageRef.scrollHeight, behavior: 'smooth' });
			}}
		>
			<span class="rotate-90 h-4 w-4 inline-block">{'->'}</span>
			see updates
		</button>
	</div>
{/if}

<Submit class="sticky bottom-0 z-10  h-12 shrink-0 flex" />
