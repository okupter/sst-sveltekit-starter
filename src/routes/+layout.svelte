<script lang="ts">
	import { page } from '$app/stores';
	import '$styles/app.postcss';
	import { onMount } from 'svelte';
	import type { Users } from '../../sst/packages/core/src/sql.generated';

	let session: Users | undefined = undefined;
	let isLoading: boolean | undefined = undefined;

	const getSession = async () => {
		const sessionToken = window.localStorage.getItem('session');

		if (sessionToken) {
			isLoading = true;

			const userInfo = await getUserInfo(sessionToken);
			console.log(userInfo);
			session = userInfo;

			isLoading = false;
		}
	};

	const setSessionToken = () => {
		const sessionToken = $page.url.searchParams.get('token');

		if (sessionToken) {
			window.localStorage.setItem('session', sessionToken);
			window.location.href = '/';
		}
	};

	const getUserInfo = async (sessionToken: string) => {
		const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/session`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to get user info');
		}

		return await response.json();
	};

	onMount(async () => {
		getSession();
		setSessionToken();
	});
</script>

<nav class="container flex items-center gap-4 py-4 mx-auto">
	<div>
		<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
	</div>

	<div>
		{#if !session}
			{#if !isLoading}
				<a href="/auth" class:active={$page.url.pathname === '/auth'}>Login</a>
			{/if}
		{:else}
			<button
				class="flex px-4 py-2 font-bold text-white bg-gray-900 rounded hover:bg-gray-700 w-fit"
				on:click={() => {
					window.localStorage.removeItem('session');
					window.location.href = '/auth';
				}}
			>
				Logout
			</button>
		{/if}
	</div>
</nav>

<main class="container py-8 mx-auto">
	<slot />
</main>

<style>
	nav a {
		@apply text-blue-700 text-lg;
	}

	nav a.active {
		@apply font-bold;
	}
</style>
