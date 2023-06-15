import { AuthHandler, GoogleAdapter, Session } from 'sst/node/auth';
import { Config } from "sst/node/config";
import { createNewUser, getUserByEmail } from '../../core/src/users';

declare module 'sst/node/auth' {
	export interface SessionTypes {
		user: {
			id: string;
		};
	}
}

const getSessionParameter = (id: string) => {
	return Session.parameter({
		redirect: 'http://localhost:5173',
		type: 'user',
		properties: {
			id
		}
	});
};

const handler = AuthHandler({
	providers: {
		google: GoogleAdapter({
			mode: 'oidc',
			clientID: Config.GOOGLE_API_CLIENT_ID,
			onSuccess: async (tokenset) => {
				const claims = tokenset.claims();

				const existingUser = await getUserByEmail(claims.email as string);

				if (existingUser) {
					return getSessionParameter(existingUser.id);
				}

				const newUser = await createNewUser(
					claims.sub,
					claims.email as string,
					claims.picture,
					claims.given_name,
					claims.family_name
				);

				return getSessionParameter(newUser.id);
			}
		})
	}
});

export { handler };
