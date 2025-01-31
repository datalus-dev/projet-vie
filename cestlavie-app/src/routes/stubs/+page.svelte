<script>
	import Gallery from "$lib/components/Gallery.svelte";
	import Microfiche from "$lib/components/Microfiche.svelte";
	
	export let data;

	// consider using the route as the property name for the collection
	const items = data.collection.stubs;
	const path = data.path;

</script>

<svelte:head>
	<title>Ticket Stubs Gallery</title>
</svelte:head>

<h1>Ticket Stubs</h1>   

<Microfiche {path} {items} />

<div>

	<Gallery {path} {items} />
</div>
