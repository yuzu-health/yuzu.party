<script lang="ts">
	import '../app.css';
	import { Footer, Toast, Header } from '$lib/components';
	import { browser } from '$app/environment';
	import '@yuzu-health/yuzui';

	export let data;

	let theme = 0;
	if (browser) theme = Number(localStorage.getItem('theme') || 0);
	$: if (browser) localStorage.setItem('theme', String(theme));
	$: pathname = data.pathname.split('/')[1];
</script>

<div class="all-flush contents yuzui-theme yuzui-theme-{theme} -with-panel">
	<Toast />

	<div>
		<div class="fixed top-0 w-screen h-screen bg-light" />
		<div
			class="fixed top-0 w-screen h-screen yuzui-bg-dashes -use-panel"
			style:--dashes-gap="6px"
		/>
	</div>

	<Header uid={data.uid} bind:theme />

	{#key pathname}
		<div class="yuzui-fadein">
			<slot />
		</div>
	{/key}

	<Footer />
</div>
