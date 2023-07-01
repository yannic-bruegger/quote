<script>
	import Quote from "../../components/quote.svelte";
  import Header from "../../components/header.svelte";
  import { Themes, NavBarState } from "../../constants";

  const quotes = [
    {
      id: 1,
      quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      quotedBy: "Nelson Mandela",
    },
    {
      id: 2,
      quote: "The way to get started is to quit talking and begin doing.",
      quotedBy: "Walt Disney",
    },
    {
      id: 3,
      quote: "If life were predictable it would cease to be life, and be without flavor.",
      quotedBy: "Eleanor Roosevelt",
    }
  ]
</script>

<Header
  title="Collection X"
  theme={Themes.PINK_GRADIENT}
  state={NavBarState.SUB}
>
</Header>
<div class="quotes">
  <div class="quote-spacer">&nbsp;</div>
  {#each quotes as quote}
    <Quote
      quote={quote.quote}
      quoted={quote.quotedBy}
    ></Quote>
  {/each}
  <div class="quote-spacer">&nbsp;</div>
</div>

<div class="actions">
  <button class="default small"><span class="icon-plus"></span></button>
  <button class="default small"><span class="icon-shuffle"></span></button>
  <button class="default"><span class="icon-chevron-left"></span></button>
  <button class="default"><span class="icon-chevron-right"></span></button>
</div>

<style lang="scss">
  .quotes {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: var(--app-padding-lr);
    flex-grow: 1;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;	
    -webkit-overflow-scrolling: touch;
  }
  
  .actions {
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    padding: var(--app-padding-lr);
    gap: 12px;
  }

  .quote-spacer {
    min-width: 100px;
    height: 100%;
    display: block;
    background-color: red;
    border-radius: var(--radius);
    background-color: var(--foreground);
    background-image: url('/watermark.svg');
    background-size: cover;
    opacity: 0;
  }
</style>