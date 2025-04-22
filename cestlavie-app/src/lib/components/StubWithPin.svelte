<script>
  import StubCard from './StubCard.svelte';
  import PushpinSVG from './svg/PushpinSVG.svelte';

  let {
    path,
    item,
    width = '200px',
    height = '200px',
    ppwidth = '16px',
    ppheight = '16px'
  } = $props();
</script>

<div class="unit">
  <div class="pushpin">
    <PushpinSVG width={ppwidth} height={ppheight} />
  </div>
  <div class="stub">
    <StubCard {path} {item} {width} {height} />
  </div>
</div>

<style>
  .stub {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--mdc-theme-on-secondary, #fff);
  }
  .unit {
    display: grid;
    justify-items: center;
  }

  .pushpin {
    margin: 0 auto -0.125rem auto;
    position: relative;
    display: grid;
    justify-content: center;
    z-index: 1;
    transform: translate(0.5rem) rotate(-0.05turn);
  }
</style>
