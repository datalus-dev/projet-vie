<script>
	import Gallery from "$lib/components/Gallery.svelte";
	
	let { data } = $props();

	// consider using the route as the property name for the collection
	const items = data.collection.stubs;
	const path = data.path;
	const item = items[0];

</script>

<svelte:head>
	<title>Ticket Stubs Gallery</title>
</svelte:head>

<h1>Ticket Stubs</h1>

<div>
	<Gallery {path} {items} />
</div>
