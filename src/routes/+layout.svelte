<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Users } from '../../sst/packages/core/src/sql.generated';

	let session: Users | undefined = undefined;

	const getSession = async () => {
		const sessionToken = window.localStorage.getItem('session');

		if (sessionToken) {
			const userInfo = await getUserInfo(sessionToken);
			console.log(userInfo);
			session = userInfo;
		}
	};

	const setSessionToken = () => {
		const sessionToken = $page.url.searchParams.get('token');

		if (sessionToken) {
			window.localStorage.setItem('session', sessionToken);
			goto('/');
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

<nav>
	<div>
		<a href="/">Home</a>
	</div>

	<div>
		{#if !session}
			<a href="/auth">Login</a>
		{:else}
			<button
				on:click={() => {
					window.localStorage.removeItem('session');
					goto('/auth');
				}}
			>
				Logout
			</button>
		{/if}
	</div>
</nav>

<slot />

<style>
	nav {
		display: flex;
		gap: 1rem;
	}
</style>
