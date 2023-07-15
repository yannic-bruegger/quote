<script lang="ts">
  import { onMount } from 'svelte';
	import Quote from "../../components/quote.svelte";
  import Header from "../../components/header.svelte";
  import { Themes, NavBarState } from "../../constants";

  const data: any[] = [
    {id: 0, quote: "Hello world 0!", quotedBy: "Author 0"},
    {id: 1, quote: "Hello world 1!", quotedBy: "Author 1"},
    {id: 2, quote: "Hello world 2!", quotedBy: "Author 2"},
    {id: 3, quote: "Hello world 3!", quotedBy: "Author 3"},
    {id: 5, quote: "Hello world 4!", quotedBy: "Author 4"},
    {id: 6, quote: "Hello world 5!", quotedBy: "Author 5"},
    {id: 7, quote: "Hello world 6!", quotedBy: "Author 6"},
    {id: 8, quote: "Hello world 7!", quotedBy: "Author 7"},
    {id: 10, quote: "Hello world 8!", quotedBy: "Author 8"},
    {id: 12, quote: "Hello world 9!", quotedBy: "Author 9"},
  ]

  // Start Index (altough traks index of current none carusel quote)
  let currentQuoteIndex = 2;

  // Single
  let singleQuote: any = {};
  
  // Carusel
  let currentQuotes: any[] = [];
  let currentCaruselQuoteIndex = 2;
  
  initCurrentQuotes(data, currentQuoteIndex);
  function initCurrentQuotes(data: any, startIndex: number) {
      if (data.length > 4) {
        for (let i = -2; i <= 2; i++) {
            let index = startIndex + i;

            if (index < 0) {
                index += data.length;
            } else if (index >= data.length) {
                index -= data.length;
            }

            currentQuotes.push(data[index]);
        }
      } else {
        singleQuote = data[startIndex];
      }
  }

  onMount(() => {
    const buttonPrev = <HTMLButtonElement>document.querySelector('button#prev');
    const buttonNext = <HTMLButtonElement>document.querySelector('button#next');

    buttonPrev.addEventListener('click', () => {
      if (data.length > 4) {
        slidePrev();
        updateCurrentQuotes('prev');
      } else {
        showPrev();
      }
    });

    buttonNext.addEventListener('click', () => {
      if (data.length > 4) {
        slideNext();
        updateCurrentQuotes('next');
      } else {
        showNext();
      }
    });
  });

  function slideNext() {
    const outerLeftQuote = <HTMLDivElement>document.querySelector('.outer-left-quote');   // 1
    const leftQuote = <HTMLDivElement>document.querySelector('.left-quote');              // 2
    const centerQuote = <HTMLDivElement>document.querySelector('.center-quote');          // 3
    const rightQuote = <HTMLDivElement>document.querySelector('.right-quote');            // 4
    const outerRightQuote = <HTMLDivElement>document.querySelector('.outer-right-quote'); // 5

    outerLeftQuote.classList.add('outer-right-quote' );
    outerLeftQuote.style.display = 'none';
    outerLeftQuote.style.left = '200%';
    outerLeftQuote.style.right = '-200%';
    outerLeftQuote.style.marginLeft = '-1rem';
    outerLeftQuote.style.removeProperty('margin-right');
    outerLeftQuote.style.removeProperty('display');
    outerLeftQuote.classList.remove('outer-left-quote');

    leftQuote.classList.add('outer-left-quote');
    leftQuote.style.left = '-200%';
    leftQuote.style.right = '200%';
    leftQuote.style.removeProperty('margin-left');
    leftQuote.style.marginRight = '-1rem';
    leftQuote.classList.remove('left-quote');

    centerQuote.classList.add('left-quote');
    centerQuote.style.left = '-100%';
    centerQuote.style.right = '100%';
    centerQuote.style.removeProperty('margin-left');
    centerQuote.style.marginRight = '-1rem';
    centerQuote.classList.remove('center-quote');

    rightQuote.classList.add('center-quote');
    rightQuote.style.left = '0%';
    rightQuote.style.right = '0%';
    rightQuote.style.removeProperty('margin-left');
    rightQuote.style.removeProperty('margin-right');
    rightQuote.classList.remove('right-quote');

    outerRightQuote.classList.add('right-quote');
    outerRightQuote.style.left = '100%';
    outerRightQuote.style.right = '-100%';
    outerRightQuote.style.marginLeft = '-1rem';
    outerRightQuote.style.removeProperty('margin-right');
    outerRightQuote.classList.remove('outer-right-quote');
  }

  function slidePrev() {
    const outerLeftQuote = <HTMLDivElement>document.querySelector('.outer-left-quote');
    const leftQuote = <HTMLDivElement>document.querySelector('.left-quote');
    const centerQuote = <HTMLDivElement>document.querySelector('.center-quote');
    const rightQuote = <HTMLDivElement>document.querySelector('.right-quote');
    const outerRightQuote = <HTMLDivElement>document.querySelector('.outer-right-quote');

    outerLeftQuote.classList.add('left-quote' );
    outerLeftQuote.style.left = '-100%';
    outerLeftQuote.style.right = '100%';
    outerLeftQuote.style.removeProperty('margin-left');
    outerLeftQuote.style.marginRight = '-1rem';
    outerLeftQuote.classList.remove('outer-left-quote');

    leftQuote.classList.add('center-quote');
    leftQuote.style.left = '0%';
    leftQuote.style.right = '0%';
    leftQuote.style.removeProperty('margin-left');
    leftQuote.style.removeProperty('margin-right');
    leftQuote.classList.remove('left-quote');

    centerQuote.classList.add('right-quote');
    centerQuote.style.left = '100%';
    centerQuote.style.right = '-100%';
    centerQuote.style.marginLeft = '-1rem';
    centerQuote.style.removeProperty('margin-right');
    centerQuote.classList.remove('center-quote');

    rightQuote.classList.add('outer-right-quote');
    rightQuote.style.left = '200%';
    rightQuote.style.right = '-200%';
    centerQuote.style.marginLeft = '-1rem';
    centerQuote.style.removeProperty('margin-right');
    rightQuote.classList.remove('right-quote');

    outerRightQuote.classList.add('outer-left-quote');
    outerLeftQuote.style.display = 'none';
    outerRightQuote.style.left = '-200%';
    outerRightQuote.style.right = '200%';
    outerRightQuote.style.removeProperty('margin-left');
    outerRightQuote.style.marginRight = '-1rem';
    outerLeftQuote.style.removeProperty('display');
    outerRightQuote.classList.remove('outer-right-quote');
  }

  function updateCurrentQuotes(direction: 'next' | 'prev') {
    let newQuote;

    if (direction === 'next') {
      let lastQuoteIndex = 0;
      let nextQuoteIndex = 0;

      if (currentCaruselQuoteIndex < currentQuotes.length - 1) {
        currentCaruselQuoteIndex++;
      } else {
        currentCaruselQuoteIndex = 0;
      }      

      switch (currentCaruselQuoteIndex) {
        case 0:
          lastQuoteIndex = 1;
          nextQuoteIndex = 2;
          break;
        case 1:
          lastQuoteIndex = 2;
          nextQuoteIndex = 3;
          break;
        case 2:
          lastQuoteIndex = 3;
          nextQuoteIndex = 4;
          break;
        case 3:
          lastQuoteIndex = 4;
          nextQuoteIndex = 0;
          break;
        case 4:
          lastQuoteIndex = 0;
          nextQuoteIndex = 1;
          break;
      }

      if (data.indexOf(currentQuotes[lastQuoteIndex]) < data.length - 1) {
        newQuote = data[data.indexOf(currentQuotes[lastQuoteIndex]) + 1];
      } else {
        newQuote = data[0];
      }

      currentQuotes[nextQuoteIndex] = newQuote;
    } else {
      let firstQuoteIndex = 0;
      let prevQuoteIndex = 0;

      if (currentCaruselQuoteIndex > 0) {
        currentCaruselQuoteIndex--;
      } else {
        currentCaruselQuoteIndex = currentQuotes.length - 1;
      }

      switch (currentCaruselQuoteIndex) {
        case 0:
          firstQuoteIndex = 4;
          prevQuoteIndex = 3;
          break;
        case 1:
          firstQuoteIndex = 0;
          prevQuoteIndex = 4;
          break;
        case 2:
          firstQuoteIndex = 1;
          prevQuoteIndex = 0;
          break;
        case 3:
          firstQuoteIndex = 2;
          prevQuoteIndex = 1;
          break;
        case 4:
          firstQuoteIndex = 3;
          prevQuoteIndex = 2;
          break;
      }

      if (data.indexOf(currentQuotes[firstQuoteIndex]) > 0) {
        newQuote = data[data.indexOf(currentQuotes[firstQuoteIndex]) - 1];
      } else {
        newQuote = data[data.length - 1];
      }

      currentQuotes[prevQuoteIndex] = newQuote;
    }
  }

  function showNext() {
    if (currentQuoteIndex < data.length - 1) {
      currentQuoteIndex++;
    } else {
      currentQuoteIndex = 0;
    }

    singleQuote = data[currentQuoteIndex];
  }

  function showPrev() {
    if (currentQuoteIndex > 0) {
      currentQuoteIndex--;
    } else {
      currentQuoteIndex = data.length - 1;
    }

    singleQuote = data[currentQuoteIndex];
  }
</script>

<Header
  title="Collection X"
  theme={Themes.PINK_GRADIENT}
  state={NavBarState.SUB}
>
</Header>
<div class="quotes">

  {#if data.length > 4}
  <div class="outer-left-quote quote-wrapper" style="left: -200%; right: 200%; margin-right: -1rem;">
    <Quote
      quote={currentQuotes[0].quote}
      quoted={currentQuotes[0].quotedBy}
    ></Quote>
  </div>

  <div class="left-quote quote-wrapper" style="left: -100%; right: 100%; margin-right: -1rem;">
    <Quote
      quote={currentQuotes[1].quote}
      quoted={currentQuotes[1].quotedBy}
    ></Quote>
  </div>

  <div class="center-quote quote-wrapper" style="left: 0; right: 0">
    <Quote
      quote={currentQuotes[2].quote}
      quoted={currentQuotes[2].quotedBy}
    ></Quote>
  </div>

  <div class="right-quote quote-wrapper" style="left: 100%; right: -100%; margin-left: -1rem;">
    <Quote
      quote={currentQuotes[3].quote}
      quoted={currentQuotes[3].quotedBy}
    ></Quote>
  </div>

  <div class="outer-right-quote quote-wrapper" style="left: 200%; right: -200%; margin-left: -1rem;">
    <Quote
      quote={currentQuotes[4].quote}
      quoted={currentQuotes[4].quotedBy}
    ></Quote>
  </div>
  {:else if data.length > 0}
    <div class="left-quote quote-wrapper" style="left: -100%; right: 100%; margin-right: -1rem;">
      <Quote
        quote={''}
        quoted={''}
      ></Quote>
    </div>

    <div class="center-quote quote-wrapper" style="left: 0; right: 0">
      <Quote
        quote={singleQuote.quote}
        quoted={singleQuote.quotedBy}
      ></Quote>
    </div>

    <div class="right-quote quote-wrapper" style="left: 100%; right: -100%; margin-left: -1rem;">
      <Quote
        quote={''}
        quoted={''}
      ></Quote>
    </div>
    {:else}
    <div class="center-quote quote-wrapper" style="left: 0; right: 0">
      <p class="nothing-here">Looks like there are no quotes here yet. Be the first to add one!</p>
    </div>
  {/if}
</div>

<div class="actions">
  <button class="default small"><span class="icon-plus"></span></button>
  <button class="default small" disabled={data.length === 0}><span class="icon-shuffle"></span></button>
  <button id="prev" class="default" disabled={data.length === 0}><span class="icon-chevron-left"></span></button>
  <button id="next" class="default" disabled={data.length === 0}><span class="icon-chevron-right"></span></button>
</div>

<style lang="scss">
  .quotes {
    flex-grow: 1;
    position: relative;
    overflow: hidden;
  }
  
  .actions {
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    padding: var(--app-padding-lr);
    gap: 12px;
  }

  .quote-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: var(--app-padding-lr);
    display: flex;
    box-sizing: border-box;
    
    transition-duration: 200ms;
    transition-property: all;
    transition-timing-function: ease;

    &:not(.center-quote) {
      scale: 0.98;
    }
  }

  .nothing-here {
    margin: auto;
    font-size: 1.2rem;
    color: var(--text-primary);
    text-align: center;
  }


  // .quote-spacer {
  //   min-width: 100px;
  //   height: 100%;
  //   display: block;
  //   background-color: red;
  //   border-radius: var(--radius);
  //   background-color: var(--foreground);
  //   background-image: url('/watermark.svg');
  //   background-size: cover;
  //   opacity: 0;
  // }
</style>