import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from 'svelte-kit-sst';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
	],
	kit: {
		adapter: adapter(),
		alias: {
			$styles: 'src/styles',
			$sst: 'sst'
		}
	}
};

export default config;
