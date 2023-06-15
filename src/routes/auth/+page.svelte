<svelte:head>
	<title>Login with Google</title>
</svelte:head>

<div class="space-y-8">
	<h1>Login with Google</h1>

	<a
		href={`${import.meta.env.VITE_APP_API_URL}/auth/google/authorize`}
		class="flex px-4 py-2 font-bold text-white bg-gray-900 rounded hover:bg-gray-700 w-fit">Login with Google</a
	>
	
</div>
