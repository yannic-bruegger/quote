<script lang="ts">
	import { Themes } from "../constants";

  export let label: string = 'Label';
  export let value: string = '';
  export let theme: Themes = Themes.PINK_GRADIENT;
  export let placeholder: string = '';
  export let autofocus: boolean | undefined;
  export let readonly: boolean = false;
</script>

<div class="input-group">
  <label class={`${theme}`} for="input">{label}</label>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus={autofocus}
    id="input"
    type="text"
    bind:value={value}
    placeholder={placeholder}
    readonly={readonly}
  >
</div>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-self: stretch;
  }

  label {
    background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }
</style>