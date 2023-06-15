import { Auth, Config, StackContext, use } from 'sst/constructs';
import { SSTSvelteKitAPI } from './Api';
import { SSTSvelteKitSite } from './Site';

const SSTSvelteKitAuth = ({ stack }: StackContext) => {
	const GOOGLE_API_CLIENT_ID = new Config.Secret(stack, 'GOOGLE_API_CLIENT_ID');

	const api = use(SSTSvelteKitAPI);
	const site = use(SSTSvelteKitSite);

	const auth = new Auth(stack, 'sst_sveltekit_auth', {
		authenticator: {
			handler: 'sst/packages/functions/src/auth.handler',
			bind: [GOOGLE_API_CLIENT_ID, site]
		}
	});

	auth.attach(stack, { api });

	return auth;
};

export { SSTSvelteKitAuth };
