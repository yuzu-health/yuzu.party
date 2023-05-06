<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { signInWithCustomToken } from 'firebase/auth';
	import { collection, onSnapshot, limit, query } from 'firebase/firestore';

	import { db, auth } from '$lib/firebase';
	import { page } from '$app/stores';
	import { timeSince } from '$lib/utils';
	import ProfilePic from '$lib/components/ProfilePic.svelte';
	import Submit from './Submit.svelte';
	import Trash from '$lib/components/icons/Trash.svelte';

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

		if (
			!data.token ||
			!data.party?.id ||
			!['yes', 'maybe'].includes(data.party.attendees?.[data.uid]?.status)
		) {
			messages = undefined;
			loadingMessage = 'RSVP to see and send messages';
			return;
		}

		if (!auth.currentUser) await signInWithCustomToken(auth, data.token);

		const q = query(collection(db, 'parties', data.party?.id, 'blocks'));
		const unsubscribe = onSnapshot(q, async (snap) => {
			const blocks: any[] = [];
			snap.forEach((doc) => blocks.push({ blockId: doc.id, ...doc.data() }));
			const cleanedMessages = blocks
				.map(({ messages, blockId }) =>
					Object.entries(messages).map(([id, message]) => ({ id, blockId, ...(message as any) }))
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
		fetchMessages();
	}
</script>

<div class="flex justify-between items-center font-medium">
	<div class="basic-panel pl-4 h-10 w-full -mr-[1px] flex items-center border-b-0">Activity</div>
	{#if ['yes', 'maybe'].includes(data?.party?.attendees?.[data.uid]?.status || '')}
		{#each attending.splice(0, 3) as [id, { name }]}
			<ProfilePic
				class="w-10 h-10 basic-panel -mr-[1px] object-cover border-b-0 bg-dots"
				uid={id}
				{name}
			/>
		{/each}
		<a
			data-sveltekit-noscroll
			href={$page.data.pathname + '/people'}
			class="w-10 h-10 basic-button flex items-center justify-center text-sm border-b-0"
		>
			{numAttending}
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
	class="h-full overflow-y-scroll basic-panel border-b-0"
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
					<div
						class="message flex border-y -mt-[1px] border-panel"
						class:pointer-events-none={message.hidden}
					>
						<ProfilePic
							uid={message.uid}
							name={data.party?.attendees?.[message.uid]?.name || ''}
							class="shrink-0 h-16 w-16 border-b border-panel bg-dots object-cover -mb-[1px]"
						/>
						<div class="p-2 -mb-[1px] border-l border-panel w-full">
							<div class="flex items-center gap-2 w-full flex-wrap">
								<span class="text-sm font-semibold" class:bg-primary={message.hidden}>
									{data.party?.attendees?.[message.uid]?.name || '???'}
								</span>
								{#if data.party?.hosts.includes(message.uid)}
									<span class="text-sm font-medium text-accent"> HOST </span>
								{/if}
								<span
									class="text-sm font-light text-primary text-opacity-50"
									class:bg-primary={message.hidden}
								>
									{timeSince(new Date(message.timestamp))} ago
								</span>
								{#if data.party?.hosts.includes(data.uid) || (data.uid === message.uid && !message.alert)}
									<button
										class="delete-button ml-auto transition-opacity active:!opacity-50"
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
			class="basic-button text-sm"
			on:click={() => {
				showScrollBottom = false;
				messageRef.scrollTo({ top: messageRef.scrollHeight, behavior: 'smooth' });
			}}
		>
			<div class="rotate-90 h-4 w-4 inline-block">{'->'}</div>
			see updates
		</button>
	</div>
{/if}

<Submit class="sticky bottom-0 z-10  h-12 shrink-0 flex" />

<style>
	.delete-button {
		opacity: 0;
	}

	.message:hover .delete-button {
		opacity: 100;
	}
</style>
