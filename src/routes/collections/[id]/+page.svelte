<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../../../components/header.svelte';
	import Carousel from '../../../components/carousel.svelte';
	import { NavBarState } from '$lib/constants';
	import { getLocalToken } from '$lib/auth';
	import { getQuotesOfCollection, createQuote, updateQuote, deleteQuote, getCollectionProperties, getMyRoleForCollection} from '$lib/api';
	import type { PageData } from './$types';

	export let data: PageData;

	let quotes: any[];
	let collectionProperties: any;
	let collectionRole: any;

	onMount(async () => {
		try {
			quotes = await getQuotesOfCollection(data.id);
			collectionProperties = await getCollectionProperties(data.id);
			collectionRole = await getMyRoleForCollection(collectionProperties.id, getLocalToken());
		} catch (error) {
			console.log(error);
		}
	});
</script>

{#if !(collectionProperties && collectionRole && quotes)}
<div id="loading-overlay"></div>
{:else}
	{#if collectionProperties && collectionRole}
		<Header title="{collectionProperties.name}" theme={collectionProperties.theme} collectionId={collectionProperties.id} state={NavBarState.COL} role={collectionRole} />
	{/if}

	{#if quotes}
		<Carousel 
			quotes={quotes} 
			options={{generalActions: true, modActions: collectionRole.isOwner || collectionRole.isModerator}} 
			collectionRole={collectionRole}
			pageData={data} />
	{/if}
{/if}


<style lang="scss">
	#loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--background);
		display: flex;
		z-index: 1000;

		background-image: url('/watermark.svg');
		background-position: center;
		background-size: cover;
	}

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

		.action-bump {
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
