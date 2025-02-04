<script>
	import Gallery from "$lib/components/Gallery.svelte";
	import Microfiche from "$lib/components/Microfiche.svelte";
	import Draggable from "$lib/components/Draggable.svelte";
	import Stub from "$lib/components/Stub.svelte";
	
	let { data } = $props();

	// consider using the route as the property name for the collection
	const items = data.collection.stubs;
	const path = data.path;
	const item = items[0];
	$inspect(items);

</script>

<svelte:head>
	<title>Ticket Stubs Gallery</title>
</svelte:head>

<h1>Ticket Stubs</h1>   


<div class="flex w-full flex-col lg:flex-row">
	<div class="card bg-base-300 rounded-box grid h-400 flex-grow place-items-center">
		<Microfiche {path} {items} />
	</div>
	
	<div class="divider lg:divider-horizontal"></div>

	<!-- <div class="card bg-base-300 rounded-box grid h-400 flex-grow place-items-center">
		<Grid width={900} height={400} />
	</div> -->
	<div id="playground">
		<Draggable top={20} left={50} {path} {item} />
	</div>
</div>

<div>

	<Gallery {path} {items} />
</div>


<style>
	.scrapbook {
		display: flex;
		/* width: 400px;
		height: 200px; */
	}
	#playground {
		width: 900px;
		height: 400px;
		background-color: lightgray;
	}
</style>