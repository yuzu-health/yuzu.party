import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				primary: 'hsl(var(--primary) / <alpha-value>)',
				accent: 'hsl(var(--accent) / <alpha-value>)',
				light: 'hsl(var(--light) / <alpha-value>)',
				panel: 'hsl(var(--panel) / <alpha-value>)'
			},
			screens: {
				xs: '475px'
			}
		}
	},
	plugins: []
};
