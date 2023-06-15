# SST SvelteKit Starter

This is a starter template for a full stack application with [SvelteKit](https://kit.svelte.dev) and [SST](https://sst.dev).

**SST** is a framework that makes it easy to build serverless apps on AWS. It provides a simple, composable, and framework agnostic stacks to define your serverless infrastructure.

## What's Included

The repository contains the following:

- `src/` - A SvelteKit application
- `sst/` - The SST infrastructure
  - `sst/stacks`: A collection of stacks that define the infrastructure
    - API
    - Authentication
    - RDS Database
    - SvelteKit site
    - S3 Bucket

## Getting Started

### Install the dependencies

```bash
pnpm install
```

### Update the environment variables

Copy the `.env.example` file to `.env` and update the values.

The `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are your AWS account IAM user (with programmatic access) credentials.

Follow this guide to create an IAM user for SST with the proper permissions: [https://sst.dev/chapters/create-an-iam-user.html](https://sst.dev/chapters/create-an-iam-user.html).

Once these environment variables are set, SST will automatically load them inside the local [Live Lambda](https://docs.sst.dev/live-lambda-development).

#### Google OAuth

The starter uses Google with OAuth `oidc` for authentication.

For this to work, you need to create an application on [https://console.cloud.google.com](https://console.cloud.google.com), create an OAuth Client, and an OAuth consent screen, and update the `.env` file with the `GOOGLE_API_CLIENT_ID`.

After you udpate the Google environment variable, run the following command:

```bash
pnpx sst secrets set GOOGLE_API_CLIENT_ID google_api_client_id
```

to set the secret into SST's config secrets.

#### Update the OAuth Authorized domains and callback URL

- Run `pnpm sst dev` to start the SST environment locally. This will output in the terminal the `API` stack URL.
- Copy the URL, and update the "Authorized domains" option in the OAuth consent screen of your Google application.
- Go to the OAuth client you created earlier, and update the "Authorized redirect URIs" with the URL of the `API` stack suffixed with `/auth/google/callback`. For instance, if your API URL is https://xxxxxx.execute-api.us-east-1.amazonaws.com, then the callback URL will be https://xxxxxx.execute-api.us-east-1.amazonaws.com/auth/google/callback.

## Development

In development, you can run SST's Live Lambda to run the application locally.

```bash
pnpm sst dev
```

This will ask you to choose a stage for the application.
The stage is a sort of workspace that SST create to prefix all the resources with; to avoid name collisions.

In another terminal, run the SvelteKit application:

```bash
pnpm dev
```

You can now access the [SST Console](https://docs.sst.dev/console) at this URL: [https://console.sst.dev/sst-sveltekit-starter](https://console.sst.dev/sst-sveltekit-starter).

The `sst-sveltekit-starter` is the name of the SST infrastructure that was defined in `sst.config.ts`.

## Deployment

To deploy the application to AWS, run the following command:

```bash
pnpm sst deploy --stage prod
```

This will make the deployement and output the application and API URLs.

### Update the OAuth callback URL

From the previous step, you should have the API URL.

- Go to the OAuth client you created earlier, and update the "Authorized redirect URIs" with the URL of the `API` stack suffixed with `/auth/google/callback`. For instance, if your API URL is https://xxxxxx.execute-api.us-east-1.amazonaws.com, then the callback URL will be https://xxxxxx.execute-api.us-east-1.amazonaws.com/auth/google/callback.
