<script>
  import Carousel from 'svelte-carousel';
  let { images } = $props();

  let carousel;
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      carousel.goToPrev();
    }

    if (e.key === 'ArrowRight') {
      carousel.goToNext();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown}/>
<Carousel
        bind:this={carousel}
        let:loaded
>
  {#each images as src, imageIndex (src)}
    <div class="img-container">
      {#if loaded.includes(imageIndex)}
        <img loading="lazy" {src} alt="nature" />
      {/if}
    </div>
  {/each}
</Carousel>
