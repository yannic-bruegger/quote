<script lang="ts">
  import { Themes } from "$lib/constants";
  const themes = Object.values(Themes);
  export let userSelected = themes[0];
  export let theme: Themes = Themes.PINK_GRADIENT;
  
</script>

<span class={`${theme}`}>Theme</span>
<div class="container">
  {#each themes as theme }
    <input class={`${theme}`} type="radio" name="theme" value={theme} bind:group={userSelected}>
  {/each }
</div>

<style scoped>
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
  }
  span {
    background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }
  input {
    display: flex;
    width: 3em;
    height: 3em;
    min-width: 3em;
    border-radius: 11px;
    position: relative;
  }
  input:checked::after {
    content: "";
    min-width: 1em;
    width: 1em;
    height: 1em;
    border: 3px solid var(--foreground);
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }
</style>