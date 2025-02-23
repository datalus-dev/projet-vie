<script>
	import { mdiClose } from '@mdi/js';
	import Card, { Content } from '@smui/card';
	import IconButton, { Icon } from '@smui/icon-button';
	import Dialog, { Content as DContent } from '@smui/dialog';
	import markdownit from 'markdown-it';
	import StubImage from './StubImage.svelte';

	let { path, item, width="200px", height="200px" } = $props();

	const md = markdownit();
	let open = $state(false);
</script>


<div class="stub card">
	<Card onclick={() => (open = true)}>
		<Content>
			{#if item.filename}
				<div class="image">
					<StubImage {path} {item} {width} {height}/>
					<!-- <article id='test'>{item.filename}</article> -->
				</div>
			{/if}
		</Content>
	</Card>
</div>
<Dialog bind:open sheet aria-describedby="sheet-content">
	<DContent id="sheet-content">
		<IconButton action="close" class="material-icons">
			<Icon tag="svg" viewBox="0 0 24 24">
				<path fill="currentColor" d={mdiClose} />
			</Icon>
		</IconButton>
		<div id="stub">
			{#if item.filename}
				<StubImage {path} {item} width={""} height={""} />
			{/if}
			{#if item.description}
				<p>{@html md.render(item.description)}</p>
			{/if}
		</div>
	</DContent>
</Dialog>

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
