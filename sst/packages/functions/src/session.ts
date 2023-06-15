import { ApiHandler } from 'sst/node/api';
import { useSession } from 'sst/node/auth';
import { getUserByID } from '../../core/src/users';

export const handler = ApiHandler(async () => {
	const session = useSession();
	console.log({ session });

	// Check user is authenticated
	if (session.type !== 'user') {
		throw new Error('Not authenticated');
	}

	const userFromSession = await getUserByID(session.properties.id);

	return {
		statusCode: 200,
		body: JSON.stringify({ user: userFromSession })
	};
});
