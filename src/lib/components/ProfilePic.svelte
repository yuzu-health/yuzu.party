<script>
	import { PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';

	export let src = '';
	export let uid = '';
	export let name = '';
	let className = '';
	export { className as class };

	const fbImage = `https://firebasestorage.googleapis.com/v0/b/${PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${uid}%2Favatar?alt=media`;
</script>

<div class="{className} relative shrink-0">
	{#if name}
		<div class="absolute h-full w-full flex items-center justify-center">
			<span class="p-1 bg-light uppercase font-normal">
				{name
					.split(' ')
					.map((w) => w[0])
					.splice(0, 3)
					.join('')}
			</span>
		</div>
	{/if}
	<img
		class={'h-full w-full absolute object-cover '}
		src={src || (uid ? fbImage : '/transparent.png')}
		on:error={(e) => {
			// @ts-ignore
			e.target.src = '/transparent.png';
		}}
		alt="Profile Picture of {uid}"
	/>
</div>
