<script lang="ts">
	import { Themes, NavBarState } from "$lib/constants";
	import { goto } from '$app/navigation';
	import user from '$lib/user'
	import { getLocalToken, isAuthenticated } from "$lib/auth";
	import { getOwnUser } from "$lib/api";

	export let title: string;
	export let theme: Themes;
	export let state: NavBarState = NavBarState.MAIN;	

	checkForAuthState()

	async function checkForAuthState() {
		if (await isAuthenticated() && !$user) {
      const token = getLocalToken();
      const response = await getOwnUser(token);
      $user = response;
    } else {
			if (!$user) goto('/signin');
		}
	}

	function goBack(defaultRoute = '/') {
		const ref = document.referrer;
		goto(ref.length > 0 ? ref : defaultRoute)
	}
</script>

<header class:around={state === NavBarState.SUB}>
	{#if state === NavBarState.SUB}
		<button class="back" on:click={() => { goBack() }}>
			<span class="icon-arrow-left"></span>
		</button>
	{/if}

	<h1 class={`${theme}`}>{ title }</h1>

	{#if state === NavBarState.MAIN}
	<a href="/users/me">
		<img src="{$user?.profilePicture ? $user.profilePicture : `https://ui-avatars.com/api/?name=${$user?.displayName}`}" alt="user" />
	</a>
	{/if}
</header>

<style scoped>
	header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
    align-items: center;
    padding: 12px var(--app-padding-lr);
		height:  64px;
	}

	h1 {
    font-size: inherit;
		color: #d27d91;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		box-shadow: var(--shadow);
	}

	button.back {
		position: absolute;
		left: var(--app-padding-lr);
	}

	.around {
		justify-content: space-around;
	}
</style>
