<!-- https://codepen.io/nabilkaz/pen/xvKzXZ -->
<script>
	import Dialog, { Content } from "@smui/dialog";
	import IconButton, { Icon } from "@smui/icon-button";
  import { mdiClose } from '@mdi/js';

  let open = $state(false);

  let {
    trip = [
      {
        stayId: 'stayId',
        tripId: 'tripId',
        contentType: 'tripInfo',
        content: {
          startDate: '2007-05-17',
          transportation: '🚂',
          carrier: '',
          carrierIATA: '2C',
          carrierABBR: 'SNCF',
          destination: 'Paris',
          desTravelCode: 'PAR',
          linkRec: '',
          linkAlbum: '' 
        }
      }
    ],
    tripId = 'tripId'
  } = $props();

</script>

{#snippet tag(content)}
  <article>
    <div class="top">
      <p class='start'>Start of Travel:</p>
      <p class='date'>{content.startDate}</p>
    </div>
    <div class="block">
      <div class="punch-hole"></div>
    </div>

    <div class="middle">
      <p>To:</p> 
      <div class="IATA">{content.desTravelCode}</div>
      <div class="destination"><p>{content.destination}</p></div>
    </div>

    <div class="bottom">
        <!-- make larger with a circle around it -->
      <div>
        <p>{content.transportation}</p>
      </div>
      <div class="carrier">
        <!-- uniform three letter -->
        {#if content.carrierIATA}
          <p class="codes">{content.carrierIATA}</p>
        {:else if content.carrierABBR}
          <p class="codes">{content.carrierABBR}</p>
        {:else}
          <p class="codes"></p>
        {/if}
        <p class="carrierFullName">{content.carrier}</p>
      </div>
    </div>
  </article>
{/snippet}

<!-- Why do I need to do [0] here? Shouldn't this evaluate to false -->
<!-- Clean up the each -->
<div class="tag">
  {#if trip.filter(t => t.contentType == 'photoAlbum').length}
    <button onclick={() => (open = true)}>
      {#each trip as tripItem}
        {#if tripItem.contentType == 'tripInfo'}
          {@render tag(tripItem.content)}
        {/if}
      {/each}
    </button>
    <Dialog bind:open sheet aria-describedby="sheet-content" class="dialog">
      <Content id="sheet-content">
        <div>
          <IconButton action="close" class="material-icons">
              <Icon tag="svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d={mdiClose} />
              </Icon>
          </IconButton>
        </div>
        <div class="dialog">
          {#each trip as tripItem}
            {#if tripItem.contentType == 'tripInfo'}
              <h1>{tripItem.content.destination}</h1>
            {/if}
          {/each}
          {#each trip as tripItem}
            {#if tripItem.content.linkRec}
              <p>📝 <a href={tripItem.content.linkRec} target="_blank">Teon's Nomadic Note: Recs</a></p>
            {/if}
            {#if tripItem.contentType == 'photoAlbum'}
              <p>📸 <a href={tripItem.content.link} target="_blank">Teon's Nomadic Note: Album</a></p>
            {/if}
          {/each}
        </div>
      </Content>
    </Dialog>
  {:else}
    {#each trip as tripItem}
      {@render tag(tripItem.content)}
    {/each}
  {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Squada+One&display=swap');

    .tag {
      display: grid;
      justify-content: center;
      align-items: center;
    }
    
    .dialog {
      display: grid;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 2rem auto;  
    }

    article {
    width: 8rem;
    height: 30rem;
    /* margin: 1rem auto; */
    /* display: flex; */
    /* display: block; */
    justify-content: space-between;
    flex-flow: column;
    background-color: #DBD2B2;
    clip-path: polygon(15% 0, 85% 0, 100% 10%, 100% 100%, 0 100%, 0 10%);
    padding: 1rem 1rem;
    }

    p {
      color: #343E6F;
    }

    .top {
      height: 4rem;
    }
  
    .top p {
    text-transform: uppercase;
    font-size: .75rem;
    text-align: center;
    align-self: center;
    font-family: 'Open Sans', sans-serif;
    color: #343E6F;
    /* margin-top: 20px; */
    margin-bottom: .25rem;
    }

    .top .date {
      font-family: 'Squada One', cursive;
      font-size: .75rem;
    }

    .block {
      height: 3rem;
    }
    
    .middle {
      height: 7rem;
    }

    .middle p {
      text-align: left;
      color: #343E6F;
      font-family: 'Open Sans', sans-serif;
      font-size: .75rem;
    }

    .bottom {
      height: 3rem;
    }
    
    .bottom p {
      text-align: center;
      color: #343E6F;
      /* font-family: 'Open Sans', sans-serif; */
      /* font-size: .75rem; */
    }

    .punch-hole {
    height: 2.5rem;
    width: 2.5rem;
    background-color: #906B39;
    border-radius: 6rem;
    display: flex;
    box-shadow: 2px 2px 2px rgba(0,0,0, .85);
    margin: auto;
    }

    .punch-hole:before {
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: #062B60;
    border-radius: 100px;
    display: inline-block;
    margin: auto;
    box-shadow: 2px 2px 4px rgba(255, 255, 255, .5);
    }


    .destination p {
    margin-top: 0px;
    font-family: 'Squada One', cursive;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #343E6F;
    width: 100%;
    font-size: 0.75rem;
    text-align: center;
    }

    .IATA {
    margin-top: -.5rem;
    font-family: 'Squada One', cursive;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: #343E6F;
    width: 100%;
    font-size: 2.5rem;
    text-align: center;
    min-height: 4rem;
    }

    .codes {
      font-family: 'Squada One', cursive;
      text-transform: uppercase;
      font-size: 1.5rem;
      /* figure out a better way to maintain distance */
      min-height: 2.25rem;
    }

    .carrier {
      font-family: 'Squada One', cursive;
    }

    button {
      background-color: rgba(0,0,0,0);
      border: 0;
      padding: 1rem;
    }
    button:hover {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }

    .dialog h1 {
      font-size: xx-large;
      color: #343E6F;
    }

    .carrierFullName {
      font-size: 1rem;
    }

</style>