import { RDS, StackContext } from 'sst/constructs';

const SSTSvelteKitRDSDB = ({ stack }: StackContext) => {
	const rds = new RDS(stack, 'db', {
		engine: 'postgresql13.9',
		defaultDatabaseName: 'sst_sveltekit_rds_db',
		migrations: 'sst/packages/core/migrations',
		types: 'sst/packages/core/src/sql.generated.ts'
	});

	return rds;
};

export { SSTSvelteKitRDSDB };
