<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
  
    import Bar from './_components/Bar.svelte';
    import AxisX from './_components/AxisX.svelte';
    import AxisY from './_components/AxisY.svelte';
  
    let { travel, filterCity = $bindable() } = $props();
  
    const xKey = 'count';
    const yKey = 'destination';
  
    const cityGroupBy = Object.groupBy(travel, ({ content: { destination } }) => destination );
    console.log(cityGroupBy['undefined'])
    let cityCount = [];
    Object.entries(cityGroupBy).map(([destination, arr]) => (cityCount.push({destination, count: arr.length})));
  
    cityCount.sort((a, b) => b.count - a.count);
    // TODO: fix the undefined city in the database
    // Likely caused by the photoAlbum
    cityCount = cityCount.filter(city => city.destination !== 'undefined')
    cityCount = cityCount.slice(0,5)
    cityCount.map((city, idx) => city.idx = idx)
  </script>
  
  <div class="chart-container">
    <LayerCake
      padding={{ bottom: 20, left: 35 }}
      x={xKey}
      y={yKey}
      yDomainSort={false}
      yScale={scaleBand().paddingInner(0.05)}
      xDomain={[0, null]}
      data={cityCount}
    >
      <Svg>
        <AxisX tickMarks baseline snapLabels />
        <AxisY bind:filterCity tickMarks gridlines={false} />
        <Bar />
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
      width: 25rem;
      height: 20rem;
      padding: 3.5rem;
    }
  </style>