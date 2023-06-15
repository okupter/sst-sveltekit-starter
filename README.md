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

For this to work, you need to create an application on [https://console.cloud.google.com](https://console.cloud.google.com), create an OAuth Client ID, and update the `.env` file with the `GOOGLE_API_CLIENT_ID`.
