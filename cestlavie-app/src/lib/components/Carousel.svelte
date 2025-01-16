<script>
  import Carousel from 'svelte-carousel';
    // ...
  let { images } = $props();
</script>

<Carousel
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
