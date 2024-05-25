<script lang="ts">
	// import Input from '../../components/input.svelte';
  import { goto } from '$app/navigation';
	import background from '$lib/assets/background.svg';
  import { register } from '$lib/api';

  async function registerButtonPresses() {
    try {
      const username = (<HTMLInputElement>document.querySelector('input[type=text]')).value;
      const email = (<HTMLInputElement>document.querySelector('input[type=email]')).value;
      const password = (<HTMLInputElement>document.querySelector('input[type=password]')).value;

        console.log();
        

      const response = await register(username, email, password);
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
    <h1 class="colored-text blue-gradient">Sign up</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input required type="text" placeholder="User name" autofocus>
    <input required type="email" placeholder="Email">
    <input required type="password" placeholder="Password">
    <button type="submit" class="default" on:click={registerButtonPresses}>Register</button>
    <p>Already have an account?<br><a href="/signin" class="colored-text blue-gradient">Sign in here</a></p>
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