<script lang="ts">
	import { goto } from '$app/navigation';
  import { authenticate, getOwnUser } from '$lib/api';
  import { getLocalToken, isAuthenticated } from '$lib/auth'
  import user from '$lib/user';
  let username = '';
  let password = '';

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
    const response = await authenticate(username, password);
    console.log(response)
    localStorage.setItem('token', response.jwt);
    $user = response.user;
    goto('/');
  }
</script>

<div class="signin-container">
  <div class="contents">
    <h1 class="colored-text blue-gradient">Sign in</h1>
    <input type="email" placeholder="Email" bind:value={username}/>
    <input type="password" placeholder="Password" bind:value={password}/>
    <button class="default" on:click={loginButtonPresses}>Login</button>
    <p>You don't have an account?<br><a href="/signup" class="colored-text blue-gradient">Register now</a></p>
  </div>
</div>

<style scoped>
  .signin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-image: url('background.svg');
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