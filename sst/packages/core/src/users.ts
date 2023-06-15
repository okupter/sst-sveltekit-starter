import { SQL } from './sql';

const createNewUser = async (
	id: string,
	email: string,
	picture: string | undefined,
	first_name: string | undefined,
	last_name: string | undefined
) => {
	const [result] = await SQL.DB.insertInto('users')
		.values({
			id,
			email,
			picture,
			first_name,
			last_name
		})
		.returningAll()
		.execute();

	return result;
};

const getUserByEmail = async (email: string) => {
	const [result] = await SQL.DB.selectFrom('users')
		.where('email', '=', email)
		.selectAll()
		.execute();

	return result;
};

const getUserByID = async (id: string) => {
	const [result] = await SQL.DB.selectFrom('users').where('id', '=', id).selectAll().execute();

	return result;
};

export { createNewUser, getUserByEmail, getUserByID };
