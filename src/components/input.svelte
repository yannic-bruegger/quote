<script context="module" lang="ts">
  export type HTMLInputElementType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
</script>

<script lang="ts">
	import { Themes } from '$lib/constants';

  export let label: string | undefined;
  export let value: string = '';
  export let theme: Themes = Themes.PINK_GRADIENT;
  export let placeholder: string = '';
  export let autofocus: boolean | undefined;
  export let readonly: boolean = false;
  export let type: HTMLInputElementType = 'text';
</script>

<div class="input-group">
  {#if label}
    <label class={`${theme}`} for="input">{label}</label>
  {/if}
  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus={autofocus}
    type={type}
    placeholder={placeholder}
    readonly={readonly}
    value={value}
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