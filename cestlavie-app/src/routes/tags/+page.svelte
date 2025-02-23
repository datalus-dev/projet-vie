<script>
    import RegionChart from '$lib/components/RegionChart.svelte';
    import TravelTag from '$lib/components/TravelTag.svelte'

    let { data } = $props();
    let { logTravel, recs } = data;

    let { recommendations } = recs;
    
    logTravel.trips.forEach((trip, idx) => {
        if (trip.stays) {
            trip.stays.forEach((stay, idy) => {
                recommendations.filter(rec => stay.destination == stay.destination).pop()
                let rec = recommendations.filter(r => r.destination == stay.destination)[0];
                logTravel.trips[idx].stays[idy].linkRec = typeof rec === 'undefined' ? '' : rec['linkRec'];

                if (trip.linkAlbum) {
                    logTravel.trips[idx].stays[idy].linkAlbum = trip.linkAlbum
                }
            })
        }
    });

    let trips = Object.groupBy(logTravel.trips, ({desRegion}) => desRegion);
    let aggTrips = {};
    Object.entries(trips).map(([region, arr]) => (aggTrips[region] = arr.length))
    aggTrips = [aggTrips];

</script>

<!-- // 1. this will be a page that pulls from the posts using the api for all the travel tagged posts
// 2. will store a private md file for each album that contains the album link and the narrative 
<svelte:head>
	<title>Travel</title>
</svelte:head>

🚧 To Be Completed 🚧 -->

<h1>Places Visited</h1>

<div class="chart">
    <RegionChart trips={aggTrips} />
</div>

<div class="tags">
{#each logTravel['trips'] as trip}
    {#if trip['stays']}
        {#each trip['stays'] as stay}
        <TravelTag {...stay}/>
        {/each}
    {/if}
{/each}
</div>

<style>
    .tags {
        display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: 50px;
		column-gap: 25px;
    }

    .chart {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        padding: 50px;
        gap: 100px;
    }

</style>

    <!-- <TravelTag /> -->

<!-- {logTravel['id']['name']} -->

<!-- {travelLog['id']} -->

<!-- {#each } -->