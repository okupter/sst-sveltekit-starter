import { StackContext, SvelteKitSite, use } from 'sst/constructs';
import { SSTSvelteKitAPI } from './Api';
import { SSTSvelteKitRDSDB } from './Database';
import { SSTSvelteKitBucket } from './Storage';

const SSTSvelteKitSite = ({ stack }: StackContext) => {
	const api = use(SSTSvelteKitAPI);

	const site = new SvelteKitSite(stack, 'sst_sveltekit_site', {
		bind: [use(SSTSvelteKitRDSDB), use(SSTSvelteKitBucket)],
		environment: {
			VITE_APP_API_URL: api.url
		}
	});

	stack.addOutputs({
		apiUrl: api.url,
		url: site.url
	});

	return site;
};

export { SSTSvelteKitSite };
