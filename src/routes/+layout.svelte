<script lang="ts">
	import '../app.css';
	import ProfilePic from '$lib/components/ProfilePic.svelte';
	import Toast from '$lib/components/Toast/Container.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import User from '$lib/components/icons/User.svelte';
	import Palette from '$lib/components/icons/Palette.svelte';
	import { browser } from '$app/environment';
	import store from './(create)/[...rest]/store';
	import themes from '$lib/themes';

	export let data;

	let theme = 0;
	if (browser) theme = Number(localStorage.getItem('theme') || 0);

	$: t =
		data.pathname.startsWith('/create') && $store.theme
			? $store.theme
			: // @ts-ignore
			  data?.party?.theme || themes[theme];
	$: pathname = data.pathname.split('/')[1];
</script>

<div
	class="all-flush transition-colors app contents text-primary"
	style="
	--primary: {t.primary};
	--light: {t.light};
	--accent: {t.accent};
	--panel: {t.panel};

	--yuzui-primary: {t.primary};
	--yuzui-light: {t.light};
	--yuzui-accent: {t.accent};
	--yuzui-panel: {t.panel};
"
>
	<div class="">
		<div class="fixed top-0 w-screen h-screen bg-light" />
		<div
			class="fixed top-0 w-screen h-screen bg-dashes text-primary text-opacity-10 transition-colors duration-150"
			style="--dashes-gap: 6px;"
		/>
	</div>

	{#key pathname}
		<div class="basic-fadein transition-colors duration-150 text-primary">
			<slot />
		</div>
	{/key}

	<div
		class="absolute top-2 text-center z-50 w-full max-w-screen-lg left-1/2 -translate-x-1/2 flex items-center"
	>
		<button
			on:click={() => {
				theme = (theme + 1) % 4;
				localStorage.setItem('theme', String(theme));
			}}
			class="absolute left-3 lg:left-0 text-primary"
		>
			<Palette class="h-4 w-5" />
		</button>
		<a href="/" class="z-50 mx-auto">
			<Logo class="h-7 py-1 pt-2 px-2 bg-light inline" />
		</a>

		{#if data.uid}
			<a
				class="absolute right-3 lg:right-0 rounded-full block justify-center h-8 w-8 overflow-hidden border bg-light border-panel text-center"
				href="/profile"
			>
				<User class="w-full h-6 absolute top-2 bg-light" />
				<ProfilePic uid={data.uid} class="absolute top-0 left-0 h-full w-full" />
			</a>
		{:else}
			<a class="absolute right-3 lg:right-0 text-sm font-medium p-0.5 bg-light" href="/signin">
				Sign In
			</a>
		{/if}
	</div>

	<div
		class="absolute bottom-2 text-center z-50 w-full max-w-screen-lg left-1/2 -translate-x-1/2 flex items-center"
	>
		<div class="mx-auto hidden sm:block">
			<Footer />
		</div>

		<a
			class="absolute hidden sm:block right-3 lg:right-0 text-sm font-medium p-0.5 bg-light"
			href="https://github.com/yuzu-health/party"
			target="_blank"
		>
			<svg
				class="h-5 w-5 text-primary text-opacity-50 hover:text-opacity-100"
				width="98"
				height="96"
				viewBox="0 0 98 96"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_2132_512)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M48.854 0C21.839 0 0 22 0 49.217C0 70.973 13.993 89.389 33.405 95.907C35.832 96.397 36.721 94.848 36.721 93.545C36.721 92.404 36.641 88.493 36.641 84.418C23.051 87.352 20.221 78.551 20.221 78.551C18.037 72.847 14.801 71.381 14.801 71.381C10.353 68.366 15.125 68.366 15.125 68.366C20.059 68.692 22.648 73.418 22.648 73.418C27.015 80.914 34.052 78.796 36.883 77.492C37.287 74.314 38.582 72.114 39.957 70.892C29.118 69.751 17.714 65.514 17.714 46.609C17.714 41.231 19.654 36.831 22.728 33.409C22.243 32.187 20.544 27.134 23.214 20.371C23.214 20.371 27.339 19.067 36.64 25.423C40.6221 24.3457 44.7288 23.7976 48.854 23.793C52.979 23.793 57.184 24.364 61.067 25.423C70.369 19.067 74.494 20.371 74.494 20.371C77.164 27.134 75.464 32.187 74.979 33.409C78.134 36.831 79.994 41.231 79.994 46.609C79.994 65.514 68.59 69.669 57.67 70.892C59.45 72.44 60.986 75.373 60.986 80.018C60.986 86.618 60.906 91.915 60.906 93.544C60.906 94.848 61.796 96.397 64.222 95.908C83.634 89.388 97.627 70.973 97.627 49.217C97.707 22 75.788 0 48.854 0Z"
						fill="currentColor"
					/>
				</g>
				<defs>
					<clipPath id="clip0_2132_512">
						<rect width="98" height="96" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</a>
	</div>

	<Toast />
</div>
