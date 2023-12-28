<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast options={{ pausable: true, classes: ['text-sm'] }} />

<style global>
	.yuzui-theme {
		--toastWidth: 14rem;
		--toastContainerTop: auto;
		--toastContainerBottom: 1.5rem;
		--toastMinHeight: 0;
		--toastBorderRadius: 0px;
		--toastBorder: 1px solid hsl(var(--yuzui-panel, var(--yuzui-primary)));
		--toastMargin: -1px 0 0 0;

		--toastMsgPadding: 0.625rem 0.75rem;
		--toastBtnContent: '';

		--toastColor: hsl(var(--yuzui-primary));
		--toastBackground: hsl(var(--yuzui-light));

		--toastBarHeight: 2px;
		--toastBarBackground: hsl(var(--yuzui-primary));

		--toastBarBackground: hsl(var(--yuzui-panel, var(--yuzui-primary)));
	}

	._toastItem {
		box-shadow: 4px 4px hsl(var(--yuzui-panel, var(--yuzui-primary))) !important;
	}
</style>
