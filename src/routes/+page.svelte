<script>
  import Collection from "../components/collection.svelte";
  import Header from "../components/header.svelte";
	import { Themes, NavBarState } from "../constants";
</script>

<Header
  title="Quote"
  theme={Themes.GREEN_GRADIENT}
  state={NavBarState.MAIN}
>
</Header>
<div class="container">
  <div class="collections">
    <Collection
      name="XYZ"
      description="12 Quotes"
      theme={Themes.GREEN_GRADIENT}
      showMenu
    ></Collection>
    <Collection
      name="XYZ"
      description="12 Quotes"
      theme={Themes.GREEN_GRADIENT}
    ></Collection>
    <Collection
      name="XYZ"
      description="12 Quotes"
      theme={Themes.GREEN_GRADIENT}
    ></Collection>
  </div>

  <div class="actions">
    <button class="default">
        <span class="icon-plus"></span>
        <span>Create Collection</span>
    </button>
  </div>
</div>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: var(--app-padding-lr);
    flex-grow: 1;
    gap: 12px;
  }
  
  .collections {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }

  .actions {
    flex-grow: 0;
  }
</style>
