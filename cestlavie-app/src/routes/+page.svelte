<script>
  import StubWithPin from '$lib/components/StubWithPin.svelte';
  import TravelTag from '$lib/components/TravelTag.svelte';
  import {
    siteTitle,
    siteDescription,
    siteImage,
    siteImageWidth,
    siteAuthor,
    siteURL,
    faviconImage
  } from '$lib/config';
</script>

<svelte:head>
  <title>{siteTitle}</title>
</svelte:head>

<p><em>pre-pre-pre-pre-alpha</em></p>
<h1>Vie: <em>it's your life</em></h1>
<p>discovery and recommendations, curated by friends</p>

<div id="assets">
  <button class="sample" onclick={() => (location.href = '/u/teon/stubs')}>
    <img
      class="stub"
      src="data/labelling/images/stubs/b6fc8982-scrapbook_26-stub_06.jpg"
      alt="ticket stub of the Arc de Triomphe"
    />
  </button>
  <button onclick={() => window.open('/u/teon/tags', '_self')}>
    <TravelTag />
  </button>
</div>

<style>
  #assets {
    width: 75vw;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, 15rem);
    justify-content: center;
    align-items: center;
    row-gap: 3rem;
  }

  h1 {
    font-size: xx-large;
    font-weight: bold;
  }

  button {
    padding: 0;
    border: none;
    background: none;
  }

  button:hover {
    cursor: pointer;
  }
</style>
