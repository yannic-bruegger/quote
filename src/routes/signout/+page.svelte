<script lang="ts">
	import { goto } from '$app/navigation';
  import { isAuthenticated, removeAUthenticatedStatus as removeAuthenticatedStatus } from '$lib/auth'


  updateAuthenticatedStatus();

  export async function updateAuthenticatedStatus() {
    if (await isAuthenticated()) await removeAuthenticatedStatus()
    goto('/')
  }
</script>

<div class="signin-container">
  <div class="contents">
    <h1 class="colored-text blue-gradient">Signing you out</h1>
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