<!--
  @component
  Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the tickMarks in the middle of the bandwidth.
 -->
<script>
  import { getContext } from 'svelte';

  const { xRange, yScale, width } = getContext('LayerCake');

  let isBandwidth = $derived(typeof $yScale.bandwidth === 'function');

  let { tickMarks = false,
    labelPosition = 'even',
    snapBaselineLabel = false,
    gridlines = true,
    format = d => d,
    ticks = 4,
    dx = 0,
    dy = 0,
    charPixelWidth = 7.25,
    tickMarkLength = undefined,
    tickGutter = 0,
    filterCity = $bindable() } = $props();

  function click(evt) {
    filterCity = evt.target.firstChild.data;
    console.log(filterCity);
  }

  /** @type {Array<any>} */
  let tickVals = $derived(Array.isArray(ticks)
    ? ticks
    : isBandwidth
      ? $yScale.domain()
      : typeof ticks === 'function'
        ? ticks($yScale.ticks())
        : $yScale.ticks(ticks));

  /** @param {Number} sum
   *  @param {String} val */
  function calcStringLength(sum, val) {
    if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
    return sum + charPixelWidth;
  }

  let tickLen =
    $derived(tickMarks === true
      ? labelPosition === 'above'
        ? (tickMarkLength ?? widestTickLen)
        : (tickMarkLength ?? 6)
      : 0);

  let widestTickLen = $derived(Math.max(
    10,
    Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
  ));

  let x1 = $derived(-tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen));
  let y = $derived(isBandwidth ? $yScale.bandwidth() / 2 : 0);

  let maxTickValPx = $derived(Math.max(...tickVals.map($yScale)));
</script>

<g class="axis y-axis">
  {#each tickVals as tick (tick)}
    {@const tickValPx = $yScale(tick)}
    <g class="tick tick-{tick}" transform="translate({$xRange[0]}, {tickValPx})">
      {#if gridlines === true}
        <line class="gridline" {x1} x2={$width} y1={y} y2={y}></line>
      {/if}
      {#if tickMarks === true}
        <line class="tick-mark" {x1} x2={x1 + tickLen} y1={y} y2={y}></line>
      {/if}
      <text
        class="btn"
        x={x1}
        onclick={click}
        {y}
        dx={dx + (labelPosition === 'even' ? -3 : 0)}
        text-anchor={labelPosition === 'above' ? 'start' : 'end'}
        dy={dy +
          (labelPosition === 'above' || (snapBaselineLabel === true && tickValPx === maxTickValPx)
            ? -3
            : 4)}>{format(tick)}</text
      >
    </g>
  {/each}
</g>

<style>
  .tick {
    font-size: 11px;
  }

  .tick line {
    stroke: #aaa;
  }
  .tick .gridline {
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #666;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }
</style>