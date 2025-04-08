<script>
    import RegionChart from '$lib/components/RegionChart.svelte';
    import TravelTag from '$lib/components/TravelTag.svelte'

    let { data } = $props();
    let { recs, travelGroupBy } = data;

    let filter = $state('');

    // figure out to deal with logout and content still being available
    let regionAgg = [];
    Object.entries(travelGroupBy).forEach(([tripId, trip]) => {
        trip?.forEach((t, idx) => {
            if (t.contentType == 'tripInfo') {
                if (recs.length > 0) {
                    let rec = recs.filter(r => r.content.destination == t.content.destination)[0];
                    travelGroupBy[tripId][idx].content.linkRec = typeof rec === 'undefined' ? '' : rec.content['link'];
                }
                regionAgg.push({desRegion: t.content.desRegion, tripId: tripId});
            }
        })
    });

    let trips = Object.groupBy(regionAgg, ({desRegion}) => desRegion);
    let aggTrips = new Object();
    Object.entries(trips).map(([region, arr]) => (aggTrips[region] = arr.length))
    // Filter US from the Rest of World
    aggTrips = [aggTrips];

</script>

<h1>Places Visited</h1>
<div class="viz">
    <div class="chart">
        <RegionChart trips={aggTrips} bind:filter={filter} />
    </div>
    <div class="reset">
        <button onclick={() => filter = ''}>Reset</button>
    </div>
</div>

<div class="divider"></div>

<div class="tags">
    {#each Object.entries(travelGroupBy) as [stayId, trip]}
        <!-- Logical or returns array even when it's empty -->
        {#if filter == '' || trip.filter(t => t['content']['desRegion'] == filter)[0]}
            <TravelTag {stayId} {trip} />
        {/if}
    {/each}
</div>

<style>
    .viz {
        /* margin: 2rem; */
    }
    .tags {
        width: 75vw;
        display: grid;
		grid-template-columns: repeat(auto-fit, 8rem);
		row-gap: 3rem;
		column-gap: 5rem;
        justify-content: center;
        /* padding: 2rem; */
    }

    .chart {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75vw;
        padding: 50px;
        gap: 100px;
    }

    .reset {
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
