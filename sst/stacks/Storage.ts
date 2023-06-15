import * as cdk from 'aws-cdk-lib';
import { Bucket, StackContext } from 'sst/constructs';

const SSTSvelteKitBucket = ({ stack }: StackContext) => {
	const bucket = new Bucket(stack, 'sst_sveltekit_bucket', {
		cdk: {
			bucket: {
				autoDeleteObjects: true,
				removalPolicy: cdk.RemovalPolicy.DESTROY
			}
		}
	});

	return bucket;
};

export { SSTSvelteKitBucket };
