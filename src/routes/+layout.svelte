<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const token = $page.url.searchParams.get('token');

		if (token) {
			window.localStorage.setItem('token', token);
			goto('/');
		}
	});
</script>

<nav>
	<div>
		<a href="/">Home</a>
		<a href="/courses/new">New Course</a>
		<a href="/courses">All Courses</a>
	</div>

	<div>
		<a href="/auth">Login</a>
		<button
			on:click={() => {
				window.localStorage.removeItem('token');
				goto('/auth');
			}}
		>
			Logout
		</button>
	</div>
</nav>

<slot />

<style>
	nav {
		display: flex;
		gap: 1rem;
	}
</style>
