<script lang="ts">
  export let quote: string;
  export let quoted: string;
</script>

<div class="quote">
  <p class="content" contenteditable="false" bind:textContent={quote}>{quote}</p>
  <p class="quoted" contenteditable="false" bind:textContent={quoted}>{quoted}</p> 
</div>

<style lang="scss">
  .quote {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: var(--radius);
    background-color: var(--foreground);
    background-image: url('/watermark.svg');
    background-size: cover;
    flex-grow: 1;
    justify-content: center;
    padding: 32px;
    min-width: 80vw;
    scroll-snap-align: center;
    z-index: 2;
  }

  .content {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.5;
  }

  .quoted  {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--text-muted);

  }
</style>