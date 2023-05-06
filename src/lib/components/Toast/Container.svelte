<script lang="ts">
	import { flip } from 'svelte/animate';
	import { toasts } from './store';
	import Helper from './Helper.svelte';
</script>

<div class="z-50 fixed bottom-5 right-5">
	{#each $toasts as toast (toast.id)}
		<div class="relative" animate:flip={{ duration: 200 }}>
			<Helper {toast} />
		</div>
	{/each}
</div>
