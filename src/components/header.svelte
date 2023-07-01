<script lang="ts">
	import { Themes, NavBarState } from "../constants";
	import { goto } from '$app/navigation';

	export let title: string;
	export let theme: Themes;
	export let state: NavBarState = NavBarState.MAIN;	


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
		<img src="https://randomuser.me/api/portraits/men/62.jpg" alt="user" />
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
