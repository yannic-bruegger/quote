<script lang="ts">
  import { Themes } from "$lib/constants";
  import { NavBarState } from "$lib/constants";
  import Input from "../../../components/input.svelte";
  import Header from "../../../components/header.svelte";
  import user from '$lib/user';
	import { goto } from "$app/navigation";
	import { getOwnUser, updateUserInfo } from "$lib/api";
	import { getLocalToken } from "$lib/auth";
	import type { User } from "$lib/types";
	import { onMount } from "svelte";

  if(!$user) throw new Error('Could not identify logged in user.')

  let newUser: User = $user

  const theme = Themes.PINK_GRADIENT;
  const token = getLocalToken();
  const passPlaceholder = "**********";

  onMount(async () => {
    newUser = await getOwnUser(token)
  })

  async function updateUser() {
    const token = getLocalToken();
    if(!$user) return;
    await updateUserInfo($user.id, newUser as User, token);
    $user = newUser
    goto('/')
  }

  function dismiss() {
    goto('/')
  }

  function signout() {
    goto('/signout')
  }

</script>

<Header
  title="Profile"
  theme={theme}
  state={NavBarState.SUB}
></Header>
<div class="form-container">
  <div class="profile-picture-wrapper">
    <img src={newUser?.profilePicture ? newUser?.profilePicture : `https://ui-avatars.com/api/?name=${newUser?.displayName}`} alt="That's me!">
  </div>
  <Input label="Display Name" theme={theme} autofocus={false} placeholder="" bind:value={newUser.displayName}></Input>
  <Input label="Email" theme={theme} autofocus={false} placeholder="" bind:value={newUser.email}></Input>
  <Input label="Username" theme={theme} autofocus={false} placeholder="" bind:value={newUser.username} readonly></Input>
  <Input label="Password" theme={theme} autofocus={false} placeholder="" value={passPlaceholder} readonly={true}></Input>
  <button class="default" on:click={signout}>Sign out<span class="icon-dismiss"></span></button>
</div>
<div class="button-group">
  <button class="default" on:click={dismiss}><span class="icon-dismiss"></span></button>
  <button class="default" on:click={updateUser}><span class="icon-check"></span></button>
</div>

<style scoped>
  .profile-picture-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    background-color: var(--foreground);
    border-radius: 0.75rem;
    height: 15rem;
    width: 15rem;
    box-shadow: var(--shadow);
    & img {
      border-radius: 0.375rem;
      width: 100%;
      height: 100%;
      box-shadow: var(--shadow);
      object-fit: cover;
      object-position: center center;
    }
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