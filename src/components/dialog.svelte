<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let text: string;
  export let open: boolean = false;
  //@ts-ignore
  
  const close = () => {
    open = false;
  }

  const submit = () => {
    dispatch('submit');
  }

  const toggle = (open: boolean) => {
    const dialog = document.querySelector("dialog");
    if(open) dialog?.showModal()
    if(!open) dialog?.close()
  }
  $: toggle(open)
</script>

<dialog id="dialog">
  <p>{text}</p>
  <div class="button-group">
    <button class="default" on:click={close} on:keydown={close}><span class="icon-dismiss"></span></button>
    <button class="default" on:click={submit}><span class="icon-delete pink-gradient colored-text"></span></button>
  </div>
</dialog>


<style>
  dialog {
    flex-direction: column;
    gap: 1em;
    width: 90%;
    position: fixed;
    margin: 0px auto;
    border: none !important;
    border-radius: var(--radius);
    box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 1em;
    margin-top: 100px;
    max-width: 400px;
  }

  div.button-group {
    display: flex;
    gap: 1em;
    position: relative;
  }
</style>