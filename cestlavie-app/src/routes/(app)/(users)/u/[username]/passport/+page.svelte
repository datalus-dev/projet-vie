<script>
  import RegionChart from '$lib/components/RegionChart.svelte';
  import TravelTag from '$lib/components/TravelTag.svelte';

  let { data } = $props();
  let { recs, travelGroupBy } = data;

  let filter = $state('');

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

  let trips = Object.groupBy(regionAgg, ({ desRegion }) => desRegion);
  let aggTrips = new Object();
  Object.entries(trips).map(([region, arr]) => (aggTrips[region] = arr.length));
  // Filter US from the Rest of World
  aggTrips = [aggTrips];
</script>

<h1>Places Visited</h1>
<div class="viz">
  <div class="charts">
    <div class="chart">
      <RegionChart trips={aggTrips} bind:filter />
    </div>
    <!-- <div class="chart">
      <RegionChart trips={aggTrips} bind:filter />
    </div> -->
  </div>
  <div class="reset">
    <button class="btn" onclick={() => (filter = '')}>Reset</button>
  </div>
</div>

<div class="divider"></div>

<div class="tags">
  {#each Object.entries(travelGroupBy) as [stayId, trip]}
    <!-- Logical or returns array even when it's empty -->
    {#if filter == '' || trip.filter((t) => t['content']['desRegion'] == filter)[0]}
      <TravelTag {stayId} {trip} />
    {/if}
  {/each}
</div>

<style>
  .charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25rem);
    justify-content: center;
    align-items: center;
  }

  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
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
