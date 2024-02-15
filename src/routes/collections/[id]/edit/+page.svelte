<script lang="ts">
  import Header from "../../../../components/header.svelte";
  import { NavBarState } from "$lib/constants";
  import { emptyCollection, type Collection } from "$lib/types";
  import CollectionComponent from "../../../../components/collection.svelte";
  import ThemeSelector from "../../../../components/theme-selector.svelte";
  import Input from "../../../../components/input.svelte";
	import UserSearch from "../../../../components/user-search.svelte";
  import { getCollection, getCollectionFollowers } from '$lib/api';
	import { onMount } from "svelte";
	import type { PageData } from './$types';
	
	export let data: PageData;
  let collection: Collection = emptyCollection;
  $: potentialModerators = [...collection.followers, ...collection.moderators?.map((mod) => ({...mod, isModerator: true}))]

  onMount(async () => {
    const token = localStorage.getItem('token');
    if (!token) throw Error('Could not load bearer token from local storage.');
    collection = await getCollection(data.id, token);
    console.log(collection)
  })
</script>

<Header
  title="Edit Collection"
  theme={collection?.theme}
  state={NavBarState.SUB}
></Header>
<div class="form-container">
  <CollectionComponent
    showMenu="{false}"
    description=""
    name={collection?.name}
    theme={collection?.theme}
    link="#"
  >
  </CollectionComponent>
  <Input label="Name" bind:value={collection.name} placeholder="New Collection" theme={collection.theme} autofocus></Input>
  <ThemeSelector theme={collection.theme} bind:userSelected={collection.theme}></ThemeSelector>
  <UserSearch
    label="Moderators"
    potentialModerators={potentialModerators}
    theme={collection.theme}
  >
  </UserSearch>
</div>
<div class="button-group">
  <button class="default small"><span class="icon-delete"></span></button>
  <button class="default"><span class="icon-dismiss"></span></button>
  <button class="default" on:click={() => {}}><span class="icon-check"></span></button>
</div>

<style scoped>
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