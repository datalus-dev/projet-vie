<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { EventHandler } from 'svelte/elements';

  let { data } = $props();
  let { supabase, user, usernames } = $derived(data);
  let username = $state('');
  if (usernames.length > 0) {
    username = usernames[0].username;
  }

  let title = $state('');
  let startDate = $state('');
  let endDate = $state('');
  let origin = $state('');
  let destination = $state('');
  let description = $state('');

  const handleSubmitTravel: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (!evt.target) return;

    const form = evt.target as HTMLFormElement;

    const title = (new FormData(form).get('title') ?? '') as string;
    if (!title) return;

    const startDate = (new FormData(form).get('startDate') ?? '') as string;
    if (!startDate) return;

    const endDate = (new FormData(form).get('endDate') ?? '') as string;
    if (!endDate) return;

    const origin = (new FormData(form).get('origin') ?? '') as string;
    if (!origin) return;

    const destination = (new FormData(form).get('destination') ?? '') as string;
    if (!destination) return;

    const description = (new FormData(form).get('description') ?? '') as string;
    if (!description) return;

    const content = {
      title,
      startDate,
      endDate,
      origin,
      destination,
      description
    };

    const { error } = await supabase
      .from('travel')
      .insert({ content, title, contentType: 'tripInfo', visibility: 'public' });
    if (error) console.error(error);

    invalidate('supabase:db:travel');
    form.reset();
  };
</script>

<h1>Add a new trip: {username}</h1>
<!-- TODO: add public/private checkbox -->

<h2>Travel Tag</h2>
<form id="travelInfo" onsubmit={handleSubmitTravel}>
  <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
    <legend class="fieldset-legend">Trip Info</legend>
    <label>
      <input
        type="text"
        name="title"
        class="input"
        placeholder="Your Epic Trip"
        bind:value={title}
      />
    </label>
    <label>
      <input
        type="date"
        name="startDate"
        class="input"
        placeholder="2024-12-31"
        bind:value={startDate}
      />
    </label>
    <label>
      <input
        type="date"
        name="endDate"
        class="input"
        placeholder="2025-01-31"
        bind:value={endDate}
      />
    </label>
    <label>
      <input type="text" name="origin" class="input" placeholder="New York" bind:value={origin} />
    </label>
    <label>
      <input
        type="text"
        name="destination"
        class="input"
        placeholder="Paris"
        bind:value={destination}
      />
    </label>
    <label>
      <input
        type="text"
        name="description"
        class="input"
        placeholder="Best New Years, ever! 🥳"
        bind:value={description}
      />
    </label>

    <button type="submit" form="travelInfo" class="btn" value="Submit">Submit</button>
  </fieldset>
</form>

<style>
  span {
    color: blue;
    border: dotted;
    border-width: 1px;
    padding: 1px;
    margin: 5px;
  }

  label {
    margin: 1rem;
  }

  h2 {
    font-size: x-large;
    padding: 2rem 0;
  }

  button {
    border: solid;
    border-width: 1px;
  }
</style>
