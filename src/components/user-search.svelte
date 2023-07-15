<script lang="ts">
	import { Themes } from "../constants";
	import type { Follower } from "../types";
  export let label: string = 'Label';
  export let theme: Themes = Themes.PINK_GRADIENT;
  let search = '';
  export let followers: Array<Follower> = [];

  $: filteredFollowers = followers.filter((follower) => {
    return JSON.stringify(Object.values(follower)).indexOf(search) > -1;
  });
</script>


<div class={theme + ` label`}>{label}</div>
<input type="search" placeholder="Search" bind:value={search}>
<ul>
  {#each filteredFollowers as follower }
    <li>
      <img src={follower.profilePicture} alt={follower.displayName}>
      <span class="displayName">{follower.displayName}</span>
      <input
        type="checkbox"
        class={theme}
        class:icon-megaphone-mute={!follower.isModerator}
        class:icon-megaphone={follower.isModerator}
        class:is-moderator={follower.isModerator}
        bind:checked={follower.isModerator}>
    </li>
  {/each}
</ul>

<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.75rem;
    background-color: var(--foreground);
    box-shadow: 0px 4px 9px 0px rgba(124, 21, 255, 0.05);
  }
  
  li {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
    padding: 0.75rem 1.5rem 0.75rem 0.75rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
  }

  .label {
    background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }

  span.displayName {
    width: 100%;
    flex-grow: 1;
  }



  input[type="checkbox"].is-moderator {
    background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }

  input[type="checkbox"]:not(.is-moderator) {
    color: var(--text-muted);
    background: none;
  }

</style>