<script>
  import Carousel from '$lib/components/Carousel.svelte';

  let { data } = $props();

  // consider using the route as the property name for the collection
  const images = data.pages;
</script>

<svelte:head>
  <title>Scrapbook</title>
</svelte:head>

<h1>Scrapbook</h1>

<Carousel {images} />
