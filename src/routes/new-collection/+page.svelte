<script lang="ts">
  import Header from "../../components/header.svelte";
  import { Themes, NavBarState } from "$lib/constants";
  import type { Collection } from "$lib/types";
  import CollectionComponent from "../../components/collection.svelte";
  import ThemeSelector from "../../components/theme-selector.svelte";
  import Input from "../../components/input.svelte";
	import Button from "../../components/button.svelte";
	import UserSearch from "../../components/user-search.svelte";
  import { createCollection } from '$lib/api';
  import user from '$lib/user';

  let newCollection: Partial<Collection> = {
    id: undefined,
    name: '',
    theme: Themes.PINK_GRADIENT,
    quotes: [],
    followers: [],
  }

  let name = ''

  function createCollectionAction() {
    const bearerToken = localStorage.getItem('token');
    if (!bearerToken) throw Error('Could not load bearer token from local storage.')
    const userId = $user?.id;
    if (!$user) throw Error('Could not load user id from store.')
    newCollection.ownerId = $user.id;
    const reply = createCollection(bearerToken, newCollection as Collection)
    console.log(reply)
  }
</script>

<Header
  title="New Collection"
  theme={newCollection.theme}
  state={NavBarState.SUB}
></Header>
<div class="form-container">
  <CollectionComponent
    showMenu="{false}"
    description={`${newCollection.quotes.length} quotes`}
    name={name ? name : 'New Collection'}
    theme={newCollection.theme}
    link="#"
  >
  </CollectionComponent>
  <Input label="Name" bind:value={name} placeholder="New Collection" theme={newCollection.theme} autofocus></Input>
  <ThemeSelector theme={newCollection.theme} bind:userSelected={newCollection.theme}></ThemeSelector>
  <UserSearch
    label="Moderators"
    followers={newCollection.followers}
    theme={newCollection.theme}
  >
  </UserSearch>
</div>
<div class="button-group">
  <button class="default small"><span class="icon-delete"></span></button>
  <button class="default"><span class="icon-dismiss"></span></button>
  <button class="default" on:click={createCollectionAction}><span class="icon-check"></span></button>
</div>

<style scoped>
  div.form-container {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    flex-grow: 1;
    overflow-x: scroll;
    height: 100%;
  }

  div.button-group:after {
    content: "";
    position: absolute;
    top: -2em;
    left: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--background) 100%);
    width: 100%;
    height: 2em;
  }

  div.button-group {
    display: flex;
    gap: 1em;
    padding: 1em;
    position: relative;
  }
</style>