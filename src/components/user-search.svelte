<script lang="ts">
	import { Themes } from "$lib/constants";
	import type { PotentialModerator } from "$lib/types";
  export let label: string = 'Label';
  export let theme: Themes = Themes.PINK_GRADIENT;
  export let selectedModerators = []
  let search = '';
  export let potentialModerators: Array<PotentialModerator> = [];

  $: filteredPotentialModerators = potentialModerators.filter((potentialModerator) => {
    return JSON.stringify(Object.values(potentialModerator)).indexOf(search) > -1;
  });

  $: selectedModerators = potentialModerators.filter((pm) => pm.isModerator).map((m) => m.id)

  function updatePotentialModeratorsList(e, id) {
    console.log('TEST')
    const mod = potentialModerators.find((pm) => pm.id === id);
    if(!mod) return;
    mod.isModerator = e.target.checked
  }
</script>

<div class="user-search">
  <div class={theme + ` label`}>{label}</div>
  <input type="search" placeholder="Search" bind:value={search}>
  <ul>
    {#each filteredPotentialModerators as potentialModerator }
      <li>
        <img src={potentialModerator.profilePicture ? potentialModerator.profilePicture : `https://ui-avatars.com/api/?name=${potentialModerator?.displayName}`} alt={potentialModerator.displayName}>
        <span class="displayName">{potentialModerator.displayName} <small>- ({potentialModerator.username})</small></span>
        <input
          type="checkbox"
          class={theme}
          class:icon-megaphone-mute={!potentialModerator.isModerator}
          class:icon-megaphone={potentialModerator.isModerator}
          class:is-moderator={potentialModerator.isModerator}
          bind:checked={potentialModerator.isModerator}
          on:change={(e) => updatePotentialModeratorsList(e, potentialModerator.id)}>
      </li>
    {/each}
  </ul>
</div>

<style scoped>
  small {
    opacity: .5;
  }
  div.user-search {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    & > * {
      width: 100%;
    }
  }

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