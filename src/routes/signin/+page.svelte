<script lang="ts">
	import Input from '../../components/input.svelte';
</script>

<div class="signin-container">
  <div class="contents">
    <h1 class="colored-text blue-gradient">Sign in</h1>
    <Input autofocus="{true}" placeholder="Email"></Input>
    <input type="password" placeholder="Password">
    <button class="default">Login</button>
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