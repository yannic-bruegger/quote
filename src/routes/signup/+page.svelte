<script lang="ts">
	import Input from '../../components/input.svelte';
	import background from '$lib/assets/background.svg';
</script>

<div class="signin-container" style="background-image: url('{background}');">
  <div class="contents">
    <h1 class="colored-text blue-gradient">Sign up</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" placeholder="Display name" autofocus>
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Password">
    <input type="password" placeholder="Repeat password">
    <button class="default">Register</button>
    <p>Already have an account?<br><a href="/signin" class="colored-text blue-gradient">Sign in here</a></p>
  </div>
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