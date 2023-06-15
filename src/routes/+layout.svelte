<script lang="ts">
	import { page } from '$app/stores';
	import '$styles/app.postcss';
	import { onMount } from 'svelte';
	import type { Users } from '../../sst/packages/core/src/sql.generated';

	let session: Users | undefined = undefined;

	const getSession = async () => {
		const sessionToken = window.localStorage.getItem('session');

		if (sessionToken) {
			const userInfo = await getUserInfo(sessionToken);
			session = userInfo;
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

<nav class="container flex gap-4 py-4 mx-auto">
	<div>
		<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
	</div>

	<div>
		{#if !session}
			<a href="/auth" class:active={$page.url.pathname === '/auth'}>Login</a>
		{:else}
			<button
				class="gap-4"
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

<main class="container mx-auto">
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
