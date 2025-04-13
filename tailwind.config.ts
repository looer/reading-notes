import type { Config } from 'tailwindcss';

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                // paper: '#F5F2EA',
                // ink: '#3A3027',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
    daisyui: {
        themes: ['light', 'retro'],
        base: true,
        styled: true,
        darkTheme: 'retro',
    }
} satisfies Config; 