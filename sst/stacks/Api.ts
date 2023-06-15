import { Api, StackContext, use } from 'sst/constructs';
import { SSTSvelteKitRDSDB } from './Database';

const SSTSvelteKitAPI = ({ stack }: StackContext) => {
	const api = new Api(stack, 'sst_sveltekit_api', {
		defaults: {
			function: {
				bind: [use(SSTSvelteKitRDSDB)]
			}
		},
		routes: {
			'GET /': 'sst/packages/functions/src/auth.handler',
			'GET /session': 'sst/packages/functions/src/session.handler'
		}
	});

	api.attachPermissions([use(SSTSvelteKitRDSDB)]);

	return api;
};

export { SSTSvelteKitAPI };
