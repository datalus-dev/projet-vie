<!-- vie.svelte -->

<!-- Structure
1. canvas component - different backgrounds (start with three)
2. ticket component - create the structure of a ticket
3. sorting and filtering component - handles managing the view on the canvas
 -->
<script>
  import Microfiche from '$lib/components/Microfiche.svelte';
  import Draggable from '$lib/components/Draggable.svelte';

  let { data } = $props();

  // consider using the route as the property name for the collection
  const items = data.collection.stubs;
  const path = data.path;
  const item = items[0];
</script>

<svelte:head>
  <title>Scrapbook Playground</title>
</svelte:head>

<h1>Playground</h1>

<div class="flex w-full flex-col lg:flex-row">
  <div class="card bg-base-300 rounded-box grid h-400 flex-grow place-items-center">
    <Microfiche {path} {items} />
  </div>

  <div class="divider lg:divider-horizontal"></div>

  <div id="playground">
    <Draggable top={20} left={50} {path} {item} />
  </div>
</div>

<!-- Artifact Picker -->
<div></div>

<style>
  #playground {
    width: 900px;
    height: 400px;
    background-color: lightgray;
  }
</style>
