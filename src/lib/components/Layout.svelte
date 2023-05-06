<script lang="ts">
	let layoutRef: HTMLDivElement;
	let left = true;
</script>

<div
	on:scroll={() => {
		if (left !== layoutRef.scrollLeft < layoutRef.clientWidth / 2) {
			left = !left;
		}
	}}
	bind:this={layoutRef}
	class="relative z-10 snap-x snap-mandatory w-screen lg:max-w-screen-lg flex overflow-x-auto lg:overflow-x-visible h-screen overflow-y-none lg:justify-center lg:items-center lg:mx-auto"
>
	<div class="w-[10px] sm:w-[10vw] lg:hidden min-w-[calc(50vw-16rem)] h-full shrink-0" />
	<div
		class="w-[calc(100vw-20px)] sm:w-[90vw] lg:w-full snap-center shrink-0 max-w-[32rem] h-full flex flex-col justify-center"
	>
		<slot name="col1" />
	</div>
	<div
		class="w-[calc(100vw-20px)] sm:w-[90vw] lg:w-full snap-center shrink-0 max-w-[32rem] h-full flex flex-col justify-center"
	>
		<slot name="col2" />
	</div>
	<div class="w-[10px] sm:w-[10vw] lg:hidden min-w-[calc(50vw-16rem)] h-full shrink-0" />
</div>

<div
	class=" fixed lg:hidden bottom-2 sm:bottom-10 left-0 w-screen justify-center flex gap-1 py-2 text-primary"
>
	<div class="h-2.5 w-2.5 border-current border {left ? 'bg-current' : 'bg-light'} rounded-full" />
	<div class="h-2.5 w-2.5 border-current border {left ? 'bg-light' : 'bg-current'} rounded-full" />
</div>
