<script lang="ts">
	import { onMount } from 'svelte';
	import Quote from '../../../components/quote.svelte';
	import Header from '../../../components/header.svelte';
	import { Themes, NavBarState } from '$lib/constants';
	import { getQuotesOfCollection, createQuote, updateQuote, deleteQuote } from '$lib/api';

	import type { PageData } from './$types';
	
	export let data: PageData;

	function initCurrentQuotes(quotes: any, startIndex: number) {
		currentQuotes = [];

		if (quotes.length > 4) {
			for (let i = -2; i <= 2; i++) {
				let index = startIndex + i;

				if (index < 0) {
					index += quotes.length;
				} else if (index >= quotes.length) {
					index -= quotes.length;
				}

				currentQuotes.push(quotes[index]);
			}
			updateQuoteIds(currentQuotes);
		} else {
			singleQuote = quotes[startIndex];
		}

	}
	
	const quoteWrapperClasses = 'quote-wrapper not-delete not-editable not-add';

	// Start Index (altough traks index of current none carusel quote)
	let currentQuoteIndex = 0;

	// Single
	let singleQuote: any = {};

	// Carusel
	let currentQuotes: any[] = [];
	let currentCaruselQuoteIndex = 2;

	let navigationHappend = false;
	let timeoutId: any = 0;
	let quoteActionClass = '';
	let visuallyCenterQuote: HTMLDivElement;
	let editedQuote: HTMLDivElement;

	let quotes: any[] = [];

	// Visible Quote Ids
	let quoteIdOuterLeft: number;
	let quoteIdLeft: number;
	let quoteIdCenter: number;
	let quoteIdRight: number;
	let quoteIdOuterRight: number;

	onMount(async () => {

		quotes = await getQuotesOfCollection(data.id);

		currentQuoteIndex = Math.round(Math.random() * quotes.length);

		initCurrentQuotes(quotes, currentQuoteIndex);
		
		const actionsWrapper = <HTMLDivElement>document.querySelector('div#actions-wrapper');
		const confirmDismissActionsWrapper = <HTMLDivElement>document.querySelector('div#confirm-dismiss-actions-wrapper');

		const buttonPrev = <HTMLButtonElement>document.querySelector('button#prev');
		const buttonNext = <HTMLButtonElement>document.querySelector('button#next');
		const buttonRandom = <HTMLButtonElement>document.querySelector('button#random');

		const navHint = <HTMLSpanElement>document.querySelector('span#nav-hint');

		const buttonAdd = <HTMLButtonElement>document.querySelector('button#add');
		const buttonEdit = <HTMLButtonElement>document.querySelector('button#edit');
		const buttonDelete = <HTMLButtonElement>document.querySelector('button#delete');

		const buttonDismiss = <HTMLButtonElement>document.querySelector('button#dismiss');
		const buttonConfirm = <HTMLButtonElement>document.querySelector('button#confirm');

		const deleteMessage = <HTMLDivElement>document.querySelector('div#delete-message');

		navHint.addEventListener('click', () => {
			const actionsWrapper = <HTMLDivElement>document.querySelector('div#actions-wrapper');
				actionsWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });

			if (actionsWrapper.scrollLeft === 0) {
				actionsWrapper.scrollTo({ left: actionsWrapper.scrollWidth, behavior: 'smooth' });
			} else {
				actionsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
			}
		});

		buttonRandom.addEventListener('click', () => {
			redrawQuotes('random');
		});

		buttonPrev.addEventListener('click', () => {
			if (navigationHappend) {
				navigationHappend = false;
			} else {
				navigatePrev();
			}
		});

		buttonNext.addEventListener('click', () => {
			if (navigationHappend) {
				navigationHappend = false;
			} else {
				navigateNext();
			}
		});

		buttonNext.addEventListener('mousedown', function (e) {
			timeoutId = setTimeout(() => {redrawQuotes('newest')}, 1000);
			buttonNext.classList.toggle('animation-inactive');
		});

		buttonNext.addEventListener('mouseup', function () {
			clearTimeout(timeoutId);
			if (!buttonNext.classList.contains('animation-inactive')) {
				buttonNext.classList.toggle('animation-inactive');
			}
		});

		buttonNext.addEventListener('touchstart', function () {
			timeoutId = setTimeout(() => {redrawQuotes('newest')}, 1000);
			buttonNext.classList.toggle('animation-inactive');
		});

		buttonNext.addEventListener('touchend', function () {
			clearTimeout(timeoutId);
			if (!buttonNext.classList.contains('animation-inactive')) {
				buttonNext.classList.toggle('animation-inactive');
			}
		});

		buttonAdd.addEventListener('click', () => {
			visuallyCenterQuote = <HTMLDivElement>document.querySelector('div.center-quote');
			actionsWrapper.classList.toggle('visible');
			confirmDismissActionsWrapper.classList.toggle('invisible');
			visuallyCenterQuote.classList.toggle('not-add');
			editedQuote = visuallyCenterQuote.cloneNode(true) as HTMLDivElement;
			
			editableContentOnOff(true, 'add');
			quoteActionClass = 'add';
		});

		buttonEdit.addEventListener('click', () => {
			visuallyCenterQuote = <HTMLDivElement>document.querySelector('div.center-quote');
			actionsWrapper.classList.toggle('visible');
			confirmDismissActionsWrapper.classList.toggle('invisible');
			visuallyCenterQuote.classList.toggle('not-editable');

			editedQuote = visuallyCenterQuote.cloneNode(true) as HTMLDivElement;
			editableContentOnOff(true);
			quoteActionClass = 'edit';
		});

		buttonDelete.addEventListener('click', () => {
			visuallyCenterQuote = <HTMLDivElement>document.querySelector('div.center-quote');
			actionsWrapper.classList.toggle('visible');
			confirmDismissActionsWrapper.classList.toggle('invisible');
			visuallyCenterQuote.classList.toggle('not-delete');
			deleteMessage.classList.toggle('invisible');
			quoteActionClass = 'delete';
		});

		buttonDismiss.addEventListener('click', () => {
			actionsWrapper.classList.toggle('visible');
			confirmDismissActionsWrapper.classList.toggle('invisible');

			switch (quoteActionClass) {
				case 'add':
					editableContentOnOff(false);

					visuallyCenterQuote = <HTMLDivElement>document.querySelector('.center-quote');
					visuallyCenterQuote.replaceWith(editedQuote);
					visuallyCenterQuote = <HTMLDivElement>document.querySelector('.center-quote');
						
					visuallyCenterQuote.classList.toggle('not-add');
					console.log('add');
					break;
				case 'edit':
					editableContentOnOff(false);
					
					visuallyCenterQuote = <HTMLDivElement>document.querySelector('.center-quote');
					visuallyCenterQuote.replaceWith(editedQuote);
					visuallyCenterQuote = <HTMLDivElement>document.querySelector('.center-quote');

					visuallyCenterQuote.classList.toggle('not-editable');
					console.log('edit');
					break;
				case 'delete':
					console.log('delete');
					visuallyCenterQuote.classList.toggle('not-delete');
					deleteMessage.classList.toggle('invisible');
					break;
			}

			quoteActionClass = '';
		});

		buttonConfirm.addEventListener('click', () => {
			if (checkForEmptyInputs()) {
				actionsWrapper.classList.toggle('visible');
				confirmDismissActionsWrapper.classList.toggle('invisible');
			} else {
				shakeButtonAndReselectEmptyInput();
				return 0;
			}

			let content = <string> visuallyCenterQuote.querySelector('.content')?.textContent;
			let quoted = <string> visuallyCenterQuote.querySelector('.quoted')?.textContent

			switch (quoteActionClass) {
				case 'add':
					editableContentOnOff(false);
					visuallyCenterQuote.classList.toggle('not-add');
					addQuote(content, quoted);
					console.log('add');
					break;
				case 'edit':
					editableContentOnOff(false);
					visuallyCenterQuote.classList.toggle('not-editable');
					editQuote(quotes[currentQuoteIndex].id, content, quoted);
					console.log('edit');
					break;
				case 'delete':
					visuallyCenterQuote.classList.toggle('not-delete');
					deleteMessage.classList.toggle('invisible');
					dropQuote(quotes[currentQuoteIndex]);
					console.log('delete');
					break;
			}

			quoteActionClass = '';
		});

		function checkForEmptyInputs() {
			if (visuallyCenterQuote) {
				let content = visuallyCenterQuote.querySelector('.quote .content')?.textContent?.length;
				let quoted = visuallyCenterQuote.querySelector('.quote .quoted')?.textContent?.length;

				if (content && quoted) {
					return content > 0 && quoted > 0
				}
				
				return false;
			}
		}

		function shakeButtonAndReselectEmptyInput() {
			if (visuallyCenterQuote) {
				let content = <HTMLInputElement>visuallyCenterQuote.querySelector('.quote .content');
				let contentLength = content?.textContent?.length;
				let quoted = <HTMLInputElement>visuallyCenterQuote.querySelector('.quote .quoted');

				if (content && quoted) {
					if (contentLength === 0) {
						content.focus();
					} else {
						quoted.focus();
					}
				}

				buttonConfirm.classList.toggle('shake');
				visuallyCenterQuote.classList.toggle('shake');

				setTimeout(() => {
					buttonConfirm.classList.toggle('shake');
					visuallyCenterQuote.classList.toggle('shake');
				}, 300);
			}
		}

		function editableContentOnOff(state: boolean, type?: string) {
			let editQuote = <HTMLInputElement>visuallyCenterQuote.querySelector('.quote .content');
			let editQuoted = <HTMLInputElement>visuallyCenterQuote.querySelector('.quote .quoted');
				
			if (editQuote && editQuoted) {
				editQuote.setAttribute('contenteditable', state ? 'true' : 'false');
				editQuoted.setAttribute('contenteditable', state ? 'true' : 'false');
				editQuote.focus();

				if (type === 'add') {
					let newQuoteId = <HTMLInputElement>visuallyCenterQuote.querySelector('.quote .quote-id')

					newQuoteId.textContent = `Quote #${(quotes.length + 1)}`;
					editQuote.textContent = '';
					editQuoted.textContent = '';
				}
			}
		}

		function redrawQuotes(type : string) {
			let newQuotes = [];
			let newCurrentCaruselQuoteIndex = currentCaruselQuoteIndex;

			navigationHappend = true;

			switch (type) {
				case 'newest':
					newQuotes.push(quotes[quotes.length - 1]);
					newQuotes.push(quotes[0]);
					newQuotes.push(quotes[1]);
					newQuotes.push(quotes[quotes.length - 3]);
					newQuotes.push(quotes[quotes.length - 2]);
					break;

				case 'oldest':
					newQuotes.push(quotes[0]);
					newQuotes.push(quotes[1]);
					newQuotes.push(quotes[2]);
					newQuotes.push(quotes[quotes.length - 2]);
					newQuotes.push(quotes[quotes.length - 1]);
					break;

				case 'random':
					let randomIndex = Math.floor(Math.random() * quotes.length);
					
					newQuotes.push(quotes[randomIndex]);

					if (randomIndex + 1 < quotes.length - 1 && randomIndex > 2) {
						newQuotes.push(quotes[randomIndex + 1]);
						newQuotes.push(quotes[randomIndex + 2]);
						newQuotes.push(quotes[randomIndex - 2]);
						newQuotes.push(quotes[randomIndex - 1]);
					} else if (randomIndex < quotes.length - 1 && randomIndex > 2) {
						newQuotes.push(quotes[randomIndex + 1]);
						newQuotes.push(quotes[0]);
						newQuotes.push(quotes[randomIndex - 2]);
						newQuotes.push(quotes[randomIndex - 1]);
					} else if (randomIndex === 2) {
						newQuotes.push(quotes[randomIndex + 1]);
						newQuotes.push(quotes[randomIndex + 2]);
						newQuotes.push(quotes[0]);
						newQuotes.push(quotes[1]);
					} else if (randomIndex === 1) {
						newQuotes.push(quotes[randomIndex + 1]);
						newQuotes.push(quotes[randomIndex + 2]);
						newQuotes.push(quotes[quotes.length - 1]);
						newQuotes.push(quotes[0]);
					} else if (randomIndex === 0) {
						newQuotes.push(quotes[1]);
						newQuotes.push(quotes[2]);
						newQuotes.push(quotes[quotes.length - 2]);
						newQuotes.push(quotes[quotes.length - 1]);
					} else {
						newQuotes.push(quotes[0]);
						newQuotes.push(quotes[1]);
						newQuotes.push(quotes[randomIndex - 2]);
						newQuotes.push(quotes[randomIndex - 1]);
					}
					break;
			}

			currentQuotes.length = 0;

			newQuotes.forEach((quote) => {
				if (newCurrentCaruselQuoteIndex < 4) {
					newCurrentCaruselQuoteIndex++;
				} else {
					newCurrentCaruselQuoteIndex = 0;
				}

				currentQuotes[newCurrentCaruselQuoteIndex] = quote;
			});

			// navigationHappend is needed to listen to next click
			navigationHappend = false;
			navigateNext();

			if (!buttonNext.classList.contains('animation-inactive')) {
				buttonNext.classList.toggle('animation-inactive');
			}
		}

		async function addQuote(quote: string, quoted: string) {
			let result = await createQuote(<string> localStorage.getItem('token'), {content: quote, quoted: quoted}, parseInt(data.id));
			if (result.ok) {
				let response = await result.json(); 
				quotes.push(response.data);
				redrawQuotes('newest');
			} else {
				console.error(result);
			}
		}

		async function editQuote(quoteId: number, quote: string, quoted: string) {
			let result = await updateQuote(<string> localStorage.getItem('token'), {content: quote, quoted: quoted}, quoteId, parseInt(data.id));
			if (!result.ok) {
				console.error(result);
			}
		}

		async function dropQuote(quote: Quote) {
			let result = await deleteQuote(<string> localStorage.getItem('token'), quote.id);
			if (result.ok) {
				let localQuoteId = quotes.indexOf(quote);
				
				if (localQuoteId > -1) {
					quotes.splice(localQuoteId, 1);
				}
				
				redrawQuotes('oldest');				
			} else {
				console.error(result);
			}
		}
	});

	function navigatePrev() {
		if (quotes.length > 4) {
			slidePrev();
			updateCurrentQuotes('prev');
		} else {
			showPrev();
		}
	}

	function navigateNext() {
		if (quotes.length > 4) {
			slideNext();
			updateCurrentQuotes('next');
		} else {
			showNext();
		}
	}

	function slideNext() {
		const outerLeftQuote = <HTMLDivElement>document.querySelector('.outer-left-quote'); // 1
		const leftQuote = <HTMLDivElement>document.querySelector('.left-quote'); // 2
		const centerQuote = <HTMLDivElement>document.querySelector('.center-quote'); // 3
		const rightQuote = <HTMLDivElement>document.querySelector('.right-quote'); // 4
		const outerRightQuote = <HTMLDivElement>document.querySelector('.outer-right-quote'); // 5
		visuallyCenterQuote = rightQuote;

		outerLeftQuote.classList.add('outer-right-quote');
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
		visuallyCenterQuote = leftQuote;

		outerLeftQuote.classList.add('left-quote');
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

			if (quotes.indexOf(currentQuotes[lastQuoteIndex]) < quotes.length - 1) {
				newQuote = quotes[quotes.indexOf(currentQuotes[lastQuoteIndex]) + 1];
			} else {
				newQuote = quotes[0];
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

			if (quotes.indexOf(currentQuotes[firstQuoteIndex]) > 0) {
				newQuote = quotes[quotes.indexOf(currentQuotes[firstQuoteIndex]) - 1];
			} else {
				newQuote = quotes[quotes.length - 1];
			}

			currentQuotes[prevQuoteIndex] = newQuote;			
		}
		currentQuoteIndex = quotes.indexOf(currentQuotes[currentCaruselQuoteIndex]);
		updateQuoteIds(currentQuotes);
	}

	function showNext() {
		if (currentQuoteIndex < quotes.length - 1) {
			currentQuoteIndex++;
		} else {
			currentQuoteIndex = 0;
		}
	}

	function showPrev() {
		if (currentQuoteIndex > 0) {
			currentQuoteIndex--;
		} else {
			currentQuoteIndex = quotes.length - 1;
		}

		singleQuote = quotes[currentQuoteIndex];
	}

	function updateQuoteIds(quotes: any[]) {
		quoteIdOuterLeft = getLocalQuoteId(quotes[0]);
		quoteIdLeft = getLocalQuoteId(quotes[1]);
		quoteIdCenter = getLocalQuoteId(quotes[2]);
		quoteIdRight = getLocalQuoteId(quotes[3]);
		quoteIdOuterRight = getLocalQuoteId(quotes[4]);
	}

	function getLocalQuoteId(quote: any) {
		return quotes.indexOf(quote) + 1;
	}
</script>

<Header title="Collection X" theme={Themes.PINK_GRADIENT} state={NavBarState.SUB} />

<div class="quotes">
	{#if quotes}
		{#if quotes.length > 4}
			<div class="outer-left-quote {quoteWrapperClasses}" style="left: -200%; right: 200%; margin-right: -1rem;">
				<Quote quoteId={quoteIdOuterLeft} quote={currentQuotes[0].attributes.content} quoted={currentQuotes[0].attributes.quoted} />
			</div>

			<div class="left-quote {quoteWrapperClasses}" style="left: -100%; right: 100%; margin-right: -1rem;">
				<Quote quoteId={quoteIdLeft} quote={currentQuotes[1].attributes.content} quoted={currentQuotes[1].attributes.quoted} />
			</div>

			<div class="center-quote {quoteWrapperClasses}" style="left: 0; right: 0">
				<Quote quoteId={quoteIdCenter} quote={currentQuotes[2].attributes.content} quoted={currentQuotes[2].attributes.quoted} />
			</div>

			<div class="right-quote {quoteWrapperClasses}" style="left: 100%; right: -100%; margin-left: -1rem;">
				<Quote quoteId={quoteIdRight}  quote={currentQuotes[3].attributes.content} quoted={currentQuotes[3].attributes.quoted} />
			</div>

			<div class="outer-right-quote {quoteWrapperClasses}" style="left: 200%; right: -200%; margin-left: -1rem;">
				<Quote quoteId={quoteIdOuterRight} quote={currentQuotes[4].attributes.content} quoted={currentQuotes[4].attributes.quoted} />
			</div>
		{:else if quotes.length > 0}
			<div class="left-quote {quoteWrapperClasses}" style="left: -100%; right: 100%; margin-right: -1rem;">
				<Quote quote={''} quoted={''} />
			</div>

			<div class="center-quote {quoteWrapperClasses}" style="left: 0; right: 0">
				<Quote quoteId={1} quote={singleQuote.quote} quoted={singleQuote.attributes.quoted} />
			</div>

			<div class="right-quote {quoteWrapperClasses}" style="left: 100%; right: -100%; margin-left: -1rem;">
				<Quote quote={''} quoted={''} />
			</div>
		{:else}
			<div class="center-quote {quoteWrapperClasses}" style="left: 0; right: 0">
				<p class="nothing-here">Looks like there are no quotes here yet. Be the first to add one!</p>
			</div>
		{/if}

		<div id="delete-message" class="invisible">
			<p class="pink-gradient colored-text"><b>Delete?</b> Are you sure?</p>
		</div>
	{/if}
</div>

<div id="actions-wrapper" class="visible">
	{#if quotes}
		<span id="nav-hint"></span>

		<div class="actions primary-actions">
			<button id="random" class="default small" disabled={quotes.length === 0}><span class="icon-shuffle" /></button>
			<button id="prev" class="default" disabled={quotes.length === 0}><span class="icon-chevron-left" /></button>
			<button id="next" class="default left-right-animation animation-inactive" disabled={quotes.length === 0}><span class="icon-chevron-right" /></button>
		</div>

		<div class="actions secondary-actions">
			<button id="add" class="default small"><span class="icon-plus" /></button>
			<button id="edit" class="default small"><span class="icon-edit" /></button>
			<button id="delete" class="default small"><span class="icon-delete pink-gradient colored-text" /></button>
		</div>
	{/if}
</div>

<div id="confirm-dismiss-actions-wrapper" class="invisible">
	<div class="actions">
		<button id="dismiss" class="default"><span class="icon-dismiss pink-gradient colored-text"></span></button>
		<button id="confirm" class="default"><span class="icon-check green-gradient colored-text"></span></button>
	</div>
</div>

<style lang="scss">
	.quotes {
		flex-grow: 1;
		position: relative;
		overflow: hidden;
	}

	@keyframes animateWidthPulse {
		0%,
		92%,
		96%,
		100% {
			width: 0.75rem;
		}
		94%,
		98% {
			width: 1.5rem;
		}
	}

	@keyframes animateNavigaionBump {
		0%,
		20%,
		60%,
		100% {
			transform: translateX(0);
		}
		40%,
		80% {
			transform: translateX(-1rem);
		}
	}

	#actions-wrapper {
		position: relative;
		transition: opacity 250ms ease;
		opacity: 0;

		&.visible {
			opacity: 1;
		}

		.actions {
			animation: animateNavigaionBump 1s linear 3s 1;
		}
	}

	#confirm-dismiss-actions-wrapper {
		position: fixed;
		bottom: -6rem;
		left: 0;
		right: 0;
		
		transition: bottom 250ms cubic-bezier(0, 0.5, 0.5, 1.25);

		&:not(.invisible) {
			bottom: 0;
		}
	}

	#actions-wrapper, #confirm-dismiss-actions-wrapper {
		display: flex;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;

		/* disable scrollbars */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari, Opera*/
		}

		#nav-hint {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%) translateX(50%);
			height: 2.5rem;
			width: 2rem;

			&::after {
				content: '';
				position: absolute;
				right: 50%;
				transform: translateX(50%);
				display: block;
				height: 100%;
				border-radius: 0.5rem;
				background-color: var(--foreground);
				box-shadow: var(--shadow);
				animation: animateWidthPulse 10s infinite;
				opacity: 0.75;
			}
		}

		.actions {
			display: flex;
			flex: 0 0 auto;
			flex-direction: row;
			flex-grow: 0;
			padding: var(--app-padding-lr);
			gap: 12px;
			width: 100%;
			scroll-snap-align: start;

			.left-right-animation {
				position: relative;
				overflow: hidden;
				span {
					position: relative;
					z-index: 2;

					color: var(--foreground);
					mix-blend-mode: difference;
				}
				&:before {
					content: '';
					position: absolute;
					background: var(--blue-gradient-90);
					bottom: 0;
					left: 0;
					right: 0;
					top: 0;
					z-index: 1;
					transition-delay: 0.2s;
					transition-duration: 0.8s;
					border-radius: var(--radius);
				}

				&.animation-inactive:before {
					right: 100%;
				}
			}
		}
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
		z-index: 1;

		transition-duration: 200ms;
		transition-property: all;
		transition-timing-function: ease;

		&:not(.center-quote) {
			scale: 0.98;
		}

		&.center-quote {

			&:not(.not-delete), &:not(.not-editable), &:not(.not-add) {
				scale: 0.95;
				&::after {
					content: '';
					position: absolute;
					top: -.25rem;
					right: -.25rem;
					bottom: -.25rem;
					left: -.25rem;
					z-index: 1;
					border-radius: var(--radius);
				}

			}

			&:not(.not-add) {
				&::after {
					background: var(--green-gradient);
				}
			}

			&:not(.not-editable) {
				&::after {
					background: var(--blue-gradient);
				}
			}
			&:not(.not-delete) {
				transform: translateY(-1.5rem);
				&::after {
					background: var(--pink-gradient);
				}
			}
		}
	}

	#delete-message {
		position: absolute;
		bottom: .5rem;
		left: 3rem;
		right: 3rem;
		text-align: center;
		transform: translateY(-100%);
		z-index: 0;
		font-size: 1.125rem;
		display: block;

		&.invisible {
			display: none;
		}
	}

	.nothing-here {
		margin: auto;
		font-size: 1.2rem;
		color: var(--text-primary);
		text-align: center;
	}
</style>
