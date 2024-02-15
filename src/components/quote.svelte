<script lang="ts">
  export let quoteId: number = 0; 
  export let quote: string;
  export let quoted: string; 
</script>

<div class="quote">
  <span class="quote-id">Quote #{quoteId}</span>
  <p class="content" contenteditable="false" bind:textContent={quote}>{quote}</p>
  <p class="quoted" contenteditable="false" bind:textContent={quoted}>{quoted}</p> 
</div>

<style lang="scss">
  .quote-id {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-muted);
    position: absolute;
    left: 2rem;
    top: 2rem;
  }
  .quote {
    display: flex;
    flex-direction: column;
    gap: .75rem;
    border-radius: var(--radius);
    background-color: var(--foreground);
    background-image: url('/watermark.svg');
    background-size: cover;
    flex-grow: 1;
    justify-content: center;
    padding: 3.5rem 2rem 2rem;
    min-width: 80vw;
    scroll-snap-align: center;
    z-index: 2;
  }

  .content {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    &:empty:before {
      content: "Add new quote...";
    }
  }

  .quoted  {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--text-muted);
    &:empty:before {
      content: "Quote by";
    }
  }

  .content, .quoted {
    position: relative;
    &:focus {
      outline: none;
      &::after {
        content: '';
        position: absolute;
        top: -.125rem;
        bottom: -.125rem;        
        left: -.75rem;
        width: .25rem;
        background: var( --black);
        border-radius: var(--radius);
        opacity: .5;
      }
      
    }
  }
</style>