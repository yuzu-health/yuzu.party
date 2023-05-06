<script>
</script>

<svelte:head>
	<title>yuzu.party</title>
</svelte:head>

<div class="h-screen w-screen flex flex-col items-center justify-center p-4">
	<div
		class="w-full lg:max-w-screen-lg h-full flex flex-col justify-center max-h-[calc(100%-90px)] max-w-lg"
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
			class="basic-panel p-4 text-center -mt-[1px] lg:h-auto h-full flex flex-col items-center justify-center"
		>
			{`Party planning software open(-sourced) to all.`}
		</div>
		<div class="flex -mt-[1px] text-center">
			<a href="/create" class="basic-button w-full">Create a party</a>
			<a href="/signin" class="basic-button w-full -ml-[1px]">See your profile</a>
		</div>
	</div>
</div>
