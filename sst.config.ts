import type { SSTConfig } from 'sst';
import { SSTSvelteKitAPI } from './sst/stacks/Api';
// import { SSTSvelteKitAuth } from './sst/stacks/Auth';
import { SSTSvelteKitRDSDB } from './sst/stacks/Database';
import { SSTSvelteKitSite } from './sst/stacks/Site';
import { SSTSvelteKitBucket } from './sst/stacks/Storage';

export default {
	config(_input) {
		return {
			name: 'sst-sveltekit-starter',
			region: 'us-east-1'
		};
	},
	stacks(app) {
		app
			.stack(SSTSvelteKitRDSDB)
			.stack(SSTSvelteKitBucket)
			.stack(SSTSvelteKitAPI)
			.stack(SSTSvelteKitSite);

		if (app.stage !== 'prod') {
			app.setDefaultRemovalPolicy('destroy');
		}
	}
} satisfies SSTConfig;
