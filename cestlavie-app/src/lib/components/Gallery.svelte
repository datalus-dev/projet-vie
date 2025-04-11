<script>
  import StubWithPin from './StubWithPin.svelte';

  let { items = [], path } = $props();
</script>

<article id="portfolio" class="panel">
  <div id="wrapper">
    {#each items as item}
      <div class="cell">
        <StubWithPin {path} {item} width={'100px'} height={'100px'} />
      </div>
    {/each}
  </div>
</article>

<style>
  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--mdc-theme-on-secondary, #fff);
  }

  #wrapper {
    display: grid;
    /* grid-template-columns: repeat(3, minmax(0, 1fr)); */
    grid-template-columns: repeat(auto-fit, 10rem);
    row-gap: 50px;
    column-gap: 1rem;
  }
</style>
