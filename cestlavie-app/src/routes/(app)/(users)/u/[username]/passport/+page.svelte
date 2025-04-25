<script>
  import BarChart from '$lib/components/BarChart.svelte';
  import RegionChart from '$lib/components/RegionChart.svelte';
  import TravelTag from '$lib/components/TravelTag.svelte';

  let { data } = $props();
  let { recs, travelGroupBy, travel } = data;

  let filter = $state('');
  let filterCity = $state('');

  // figure out to deal with logout and content still being available
  let regionAgg = [];
  Object.entries(travelGroupBy).forEach(([tripId, trip]) => {
    trip?.forEach((t, idx) => {
      if (t.contentType == 'tripInfo') {
        if (recs.length > 0) {
          let rec = recs.filter((r) => r.content.destination == t.content.destination)[0];
          travelGroupBy[tripId][idx].content.linkRec =
            typeof rec === 'undefined' ? '' : rec.content['link'];
        }
        regionAgg.push({ desRegion: t.content.desRegion, tripId: tripId });
      }
    });
  });

  let travels = Object.entries(travelGroupBy);
  travels.sort(([_, a], [__, b]) => {
    const dateA = new Date(a.at(-1).startDate);
    const dateB = new Date(b.at(-1).startDate);

    return dateB - dateA;
  });

  let trips = Object.groupBy(regionAgg, ({ desRegion }) => desRegion);
  let aggTrips = new Object();
  Object.entries(trips).map(([region, arr]) => (aggTrips[region] = arr.length));
  // Filter US from the Rest of World
  aggTrips = [aggTrips];
  $inspect(filterCity);
</script>

<h1>Places Visited</h1>

<!-- <div class="viz"> -->
<h2>Charts</h2>
<div class="charts">
  <div class="radial">
    <h3>World Regions</h3>
    <div class="chart">
      <RegionChart trips={aggTrips} bind:filter />
    </div>
  </div>
  <div class="bar-chart">
    <h3>Top Visited Cities</h3>
    <div class="chart">
      <BarChart {travel} bind:filterCity />
    </div>
  </div>
</div>
<div class="reset">
  <button class="btn" onclick={() => (filter = '')}>Reset</button>
</div>

<div class="divider"></div>

<div class="tags">
  {#each travels as [stayId, trip]}
    <!-- Logical or returns array even when it's empty -->
    {#if (filter == '' && filterCity == '') || trip.filter((t) => t['content']['desRegion'] == filter)[0] || trip.filter((t) => t['content']['destination'] == filterCity)[0]}
      <TravelTag {stayId} {trip} />
    {/if}
  {/each}
</div>

<style>
  .charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25rem);
    justify-content: center;
    column-gap: 5rem;
    align-items: top;
  }

  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .reset {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tags {
    display: grid;
    grid-template-columns: repeat(auto-fit, 8rem);
    row-gap: 3rem;
    column-gap: 5rem;
    align-items: center;
  }
</style>
