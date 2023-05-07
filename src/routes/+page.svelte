<script>
</script>

<svelte:head>
	<title>yuzu.party</title>
</svelte:head>

<div class="w-screen flex flex-col items-center justify-center p-4 h-screen">
	<div
		class="w-full lg:max-w-screen-lg flex flex-col justify-center max-h-[calc(100vh-90px)] sm:max-h-[34rem] h-screen max-w-lg"
	>
		<div
			class="basic-panel whitespace-pre text-center text-[6px] sm:text-[8px] lg:text-[12px]"
			style="font-family: Monospace;"
		>
			{String.raw`
 __  __     __  __     ______     __  __     ______   ______     ______     ______   __  __    
/\ \_\ \   /\ \/\ \   /\___  \   /\ \/\ \   /\  == \ /\  __ \   /\  == \   /\__  _\ /\ \_\ \   
\ \____ \  \ \ \_\ \  \/_/  /__  \ \ \_\ \  \ \  _-/ \ \  __ \  \ \  __<   \/_/\ \/ \ \____ \  
 \/\_____\  \ \_____\   /\_____\  \ \_____\  \ \_\    \ \_\ \_\  \ \_\ \_\    \ \_\  \/\_____\ 
  \/_____/   \/_____/   \/_____/   \/_____/   \/_/     \/_/\/_/   \/_/ /_/     \/_/   \/_____/ 
                                                                                               
  `}
		</div>
		<div
			class="basic-panel px-4 py-10 text-center -mt-[1px] lg:h-auto h-full flex items-center justify-center"
		>
			Party planning software <a
				class="underline underline-offset-4 font-medium mx-1"
				href="https://github.com/yuzu-health/party"
				target="_blank">{`open(-sourced)`}</a
			> to all.
		</div>
		<div class="flex -mt-[1px] text-center">
			<a href="/create" class="basic-button w-full">Create a party</a>
			<a href="/signin" class="basic-button w-full -ml-[1px]">See your profile</a>
		</div>
	</div>
</div>
