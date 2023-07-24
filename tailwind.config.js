import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				primary: 'hsl(var(--yuzui-primary) / <alpha-value>)',
				accent: 'hsl(var(--yuzui-accent) / <alpha-value>)',
				light: 'hsl(var(--yuzui-light) / <alpha-value>)',
				panel: 'hsl(var(--yuzui-panel) / <alpha-value>)'
			},
			screens: {
				xs: '475px'
			}
		}
	},
	plugins: []
};
