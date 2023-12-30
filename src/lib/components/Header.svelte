<script lang="ts">
	import { ProfilePic, YuzuParty, User, Palette } from '$lib/components';

	export let uid = '';
	export let theme = 0;
</script>

<div
	class="absolute top-2 text-center z-50 w-full max-w-screen-lg left-1/2 -translate-x-1/2 flex items-center"
>
	<button on:click={() => (theme = (theme + 1) % 4)} class="absolute left-3 lg:left-0 text-primary">
		<Palette class="h-4 w-5" />
	</button>

	<a href="/" class="z-50 mx-auto">
		<YuzuParty class="h-7 py-1 pt-2 px-2 bg-light inline" />
	</a>

	{#if uid}
		<a
			class="absolute right-3 lg:right-0 rounded-full block justify-center h-8 w-8 overflow-hidden border bg-light border-panel text-center"
			href="/profile"
		>
			<User class="w-full h-6 absolute top-2 bg-light" />
			<ProfilePic {uid} class="absolute top-0 left-0 h-full w-full" />
		</a>
	{:else}
		<a class="absolute right-3 lg:right-0 text-sm font-medium p-0.5 bg-light" href="/signin">
			Sign In
		</a>
	{/if}
</div>
