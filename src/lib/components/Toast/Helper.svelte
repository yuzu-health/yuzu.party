<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { dismiss } from './store';
	import type { Toast } from './store';

	export let toast: Toast;

	let counter = 0;
	// @ts-ignore
	let clear: NodeJS.Timer;
	const refreshRate = 100;

	const incr = () => {
		counter = counter + refreshRate;
		if (counter >= toast.timeout) {
			clearInterval(clear);
			dismiss(toast.id);
		}
	};

	const onMouseEnter = () => {
		clearInterval(clear);
	};

	const onMouseLeave = () => {
		clear = setInterval(incr, refreshRate);
	};

	const onClick = () => {
		if (toast.onclick) toast.onclick();
		clearInterval(clear);
		dismiss(toast.id);
	};

	onMount(() => {
		clear = setInterval(incr, refreshRate);
		if (toast.timeout === 0) clearInterval(clear);
		return () => clearInterval(clear);
	});

	const toastClass =
		'yuzui relative -mt-[1px] block w-48 !px-2 !py-2 text-left text-sm ' + toast.class;
</script>

<a
	class="{toastClass} transform-gpu"
	in:fly|local={{ y: 20 }}
	out:fade|local={{ duration: 200 }}
	on:click={onClick}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	href={toast.href}
>
	{toast.message}

	{#if toast.timeout > 0}
		<div
			class="absolute top-0 left-0 h-[2px] border-r border-b border-current bg-current transition-[width] duration-[{refreshRate}ms]"
			style="width: {(1 - counter / toast.timeout) * 100}%;"
		/>
	{/if}
</a>
