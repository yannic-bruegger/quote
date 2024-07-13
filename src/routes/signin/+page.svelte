<script lang="ts">
	import { goto } from '$app/navigation';
  import { Themes } from "$lib/constants";
  import { getRandomTheme } from '$lib/helper';
  import { authenticate, getOwnUser } from '$lib/api';
  import { getLocalToken, isAuthenticated } from '$lib/auth';
  import background from '$lib/assets/background.svg';
  import user from '$lib/user';
  let username = '';
  let password = '';
  const theme = getRandomTheme(Themes);

  updateAuthenticatedStatus();

  export async function updateAuthenticatedStatus() {
    if (await isAuthenticated()) {
      const token = getLocalToken();
      const response = await getOwnUser(token);
      $user = response;
      goto('/')
    }
  }

  async function loginButtonPresses() {
    try {
      const response = await authenticate(username, password);
      localStorage.setItem('token', response.jwt);
      $user = response.user;
      goto('/');
    } catch {
      const form = <HTMLDivElement>document.querySelector('form.contents');

      form.classList.toggle('shake');
      setTimeout(() => {
        form.classList.toggle('shake');
      }, 300);
    }
  }
</script>

<div class="signin-container" style="background-image: url('{background}');">
  <form class="contents">
    <h1 class="colored-text {theme}">Sign in</h1>
    <input required type="text" placeholder="Username" bind:value={username}/>
    <input required type="password" minlength="6" placeholder="Password" bind:value={password}/>
    <button type="submit" class="default" on:click={loginButtonPresses}>Login</button>
    <p>You don't have an account?<br><a href="/signup" class="colored-text {theme}">Register now</a></p>
  </form>
</div>

<style scoped>
  .signin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    min-width: 20rem;
  }

  h1 {
    font-weight: 100;
  }
</style>