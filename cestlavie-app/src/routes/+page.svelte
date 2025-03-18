<script>
    import StubWithPin from '$lib/components/StubWithPin.svelte';
    import TravelTag from '$lib/components/TravelTag.svelte';
    import { siteTitle, siteDescription, siteImage, siteImageWidth, siteAuthor, siteURL, faviconImage } from '$lib/config';    

</script>
    
<svelte:head>
    <title>{siteTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <meta data-key="description" name="description" content="{siteDescription}">
    <meta name="author" content={siteAuthor}>
    <!-- Favicon -->
    <link rel="icon" type="image/svg" href={faviconImage} />
    <!-- Open Graph -->
    <meta property="og:type" content="profile" />
    <meta property="og:url" content={siteURL}>
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteDescription} />
    <meta property="og:image" content={siteImage} />
    <meta property="og:image:width" content={siteImageWidth} />
    <meta property="og:image:height" content={siteImageWidth} />
</svelte:head>

<p><em>pre-pre-pre-pre-alpha</em></p>
<h1 class="md:text-6xl py-3 font-bold text-3xl">Vie: <em>it's your life</em></h1>
<p>discovery and recommendations, curated by friends</p>
<p></p>

<div id="assets">
    <button class='sample' onclick={() => window.open("/u/teon/stubs", "_self")}>
        <img class="stub" src="data/labelling/images/stubs/b6fc8982-scrapbook_26-stub_06.jpg" alt="ticket stub of the Arc de Triomphe">
    </button>
    <button onclick={() => window.open("/u/teon/tags", "_self")}>
        <TravelTag />
    </button>
</div>

<style>

#assets {
    width: 100vw;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, 25rem);
    justify-content:center;
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
