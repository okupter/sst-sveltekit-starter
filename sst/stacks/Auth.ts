import { Auth, StackContext, use } from 'sst/constructs';
import { SSTSvelteKitAPI } from './Api';

const SSTSvelteKitAuth = ({ stack }: StackContext) => {
	const api = use(SSTSvelteKitAPI);

	const auth = new Auth(stack, 'sst_sveltekit_auth', {
		authenticator: {
			handler: 'sst/packages/functions/src/auth.handler'
		}
	});

	auth.attach(stack, { api });

	return auth;
};

export { SSTSvelteKitAuth };
