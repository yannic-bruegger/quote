<script lang="ts">
	import { Themes } from "$lib/constants";

  export let name: string = "Collection Name";
  export let description: string = '';
  export let theme: Themes = Themes.BLUE_GRADIENT;
  export let showMenu: boolean = false;
  export let id: string = '';
  
  export let link: string= `/collections/${id}`;

  if (!theme) theme = Themes.BLUE_GRADIENT;
</script>

<a href={link}>
  <div class="collection">
    <div class={`color-indicator ${theme}`}></div>
    <div class="details">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
    <div class="actions">
      {#if showMenu}
        <button>
          <span class="icon-context-vertical"></span>
        </button>
      {/if}
    </div>
  </div>
</a>


<style scoped lang="scss">
  .collection {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px 16px 12px 12px;
    border-radius: var(--radius);
    background-color: var(--foreground);
    box-shadow: var(--shadow);
    min-height: 70px;
  }

  .color-indicator {
    width: 8px;
    border-radius: 8px;
    display: block;
    flex-grow: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
      color: var(--text-muted);
    }
  }
  
  .actions {
    display: flex;
    justify-content: center;
    flex-grow: 0;
  }

  .icon-context-vertical {
    font-size: 24px;
  }
</style>