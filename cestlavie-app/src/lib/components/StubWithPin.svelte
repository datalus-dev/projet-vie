<script>
	import StubCard from './StubCard.svelte';

	let { path, item, width="200px", height="200px" } = $props();

</script>

<div>
	<div class="pushpin tilted">
		<div class="pinhead"></div>
		<div class="pinbase"></div>
		<div class="pinshaft"></div>
		<div class="pinpoint"></div>
	</div>
	<StubCard {path} {item} {width} {height} />
</div>


<style>
	@import './css/pushpin.css';

	.image {
		display: grid;
		place-items: center;
	}

	.card:hover {
		cursor: pointer;
	}

</style>
