<script>
	import { YuzuHealth, Github } from '$lib/components';
</script>

<div
	class="absolute bottom-2 text-center z-50 w-full max-w-screen-lg left-1/2 -translate-x-1/2 flex items-center"
>
	<div class="bg-inherit py-1 px-2 sm:inline-flex items-center gap-2 mx-auto hidden">
		<span class="whitespace-pre text-primary/50">Created by</span>

		<a
			href="https://yuzu.health"
			target="_blank"
			class="text-primary text-opacity-50 hover:text-opacity-100 transition-all"
		>
			<YuzuHealth class="h-4 -ml-0.5 -mb-[2px] w-auto" />
		</a>
	</div>

	<a
		class="absolute hidden sm:block right-3 lg:right-0 text-sm font-medium p-0.5 bg-light"
		href="https://github.com/yuzu-health/party"
		target="_blank"
	>
		<Github class="h-5 w-5 text-primary text-opacity-50 hover:text-opacity-100" />
	</a>
</div>
