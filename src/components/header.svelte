<script lang="ts">
	import { Themes, NavBarState } from '$lib/constants';
	import { goto } from '$app/navigation';
	import user from '$lib/user';
	import { getLocalToken, isAuthenticated } from '$lib/auth';
	import { getOwnUser, bookmarkCollection, removeBookmarkedCollection } from '$lib/api';

	export let title: string;
	export let theme: Themes | undefined;
	export let collectionId: number = -1;
	export let state: NavBarState = NavBarState.MAIN;
	export let role: any = undefined;

	checkForAuthState();

	async function checkForAuthState() {
		if ((await isAuthenticated()) && !$user) {
			const token = getLocalToken();
			const response = await getOwnUser(token);
			$user = response;
		} else {
			if (state !== NavBarState.COL && !$user) goto('/signin');
		}
	}

	function goBack(defaultRoute = '/') {
		goto(defaultRoute);
	}

	function toggleFollow() {
		if (role.isFollower) {
			if (confirm("Unfollow this collection?")) {
				removeBookmarkedCollection((collectionId).toString(), getLocalToken());
				role.isFollower = false;
			}
		} else {
			bookmarkCollection((collectionId).toString(), getLocalToken());
			role.isFollower = true;
		}
	}
	
</script>

<header class:around={state !== NavBarState.MAIN}>
	{#if $user && (state === NavBarState.SUB || state === NavBarState.COL)}
		<button
			class="back"
			on:click={() => {
				goBack();
			}}
		>
			<span class="icon-arrow-left" />
		</button>
	{/if}

	<h1 class={theme ?? Themes.PURPLE_GRADIENT} class:title={state == NavBarState.MAIN}>{title}</h1>

	{#if $user && state === NavBarState.MAIN}
		<a href="/users/me">
			<img
				src={$user?.profilePicture
					? $user.profilePicture
					: `https://ui-avatars.com/api/?name=${$user?.displayName}`}
				alt="user"
			/>
		</a>
	{/if}

	{#if state === NavBarState.COL}
		<div class="context">
			{#if $user && role.isFollower && !role.isOwner && !role.isModerator}
				<button class="bookmark" on:click={() => toggleFollow()}>
					<span class="icon-bookmark-delete" />
				</button>
			{/if}
			{#if $user && !role.isFollower && !role.isOwner && !role.isModerator}
				<button class="bookmark" on:click={() => toggleFollow()}>
					<span class="icon-bookmark" />
				</button>
			{/if}
			{#if !$user && !role.isFollower && !role.isOwner && !role.isModerator}
				<button class="bookmark" on:click={() => goto('/signin')}>
					<span class="icon-login"/>
				</button>
			{/if}
		</div>
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
		height: 64px;
	}

	h1 {
		font-size: inherit;
		color: #d27d91;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		&.title {
			font-size: 1.5rem;
		}
	}

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		box-shadow: var(--shadow);
	}

	button {
		&.back {
			position: absolute;
			left: var(--app-padding-lr);
		}
	}

	div.context {
		position: absolute;
		right: var(--app-padding-lr);
	}

	.around {
		justify-content: space-around;
	}
</style>
