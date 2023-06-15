<svelte:head>
	<title>Login with Google</title>
</svelte:head>

<h1>Login with Google</h1>

<a href={`${import.meta.env.VITE_APP_API_URL}/auth/google/authorize`}
	>Login with Google</a
>
