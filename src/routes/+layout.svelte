<script>
  import Header from "../components/header.svelte";
  import { Themes, NavBarState } from "../constants";
</script>

<slot></slot>

<style>
  slot {
    display: block;
    padding: var(--app-padding-lr);
  }
</style>