<script>
  import { LayerCake, Svg } from 'layercake';

  import Radar from './_components/Radar.svelte';
  import AxisRadial from './_components/AxisRadial.svelte';

  let { trips, filter = $bindable() } = $props();
  const xKey = Object.keys(trips[0]);
  let xmax = Math.max(...Object.values(trips[0]));
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 30, right: 30, bottom: 30, left: 30 }}
    x={xKey}
    xDomain={[0, xmax]}
    xRange={({ height }) => [0, height / 2]}
    data={trips}
  >
    <Svg>
      <AxisRadial bind:filter />
      <Radar />
    </Svg>
  </LayerCake>
</div>

<style>
  /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */

  .chart-container {
    width: 30rem;
    height: 20rem;
    padding: 3.5rem;
  }
</style>
