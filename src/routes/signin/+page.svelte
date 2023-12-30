<script lang="ts">
	import SignIn from './widget.svelte';
	import { goto, afterNavigate } from '$app/navigation';

	let previousPage: string;
	afterNavigate(({ from }) => {
		previousPage =
			!from?.url.pathname || from?.url?.pathname === '/create' ? '/profile' : from?.url.pathname;
	});
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<div class="h-screen max-w-lg mx-auto flex flex-col justify-center p-4">
	<SignIn on:signin={() => goto(previousPage || '/profile')} />
</div>
