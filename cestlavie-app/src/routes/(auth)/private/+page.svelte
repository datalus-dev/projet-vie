<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { EventHandler } from 'svelte/elements';

  import type { PageData } from './$types';

  let { data } = $props();
  let { notes, acls, supabase, user, username } = $derived(data);

  let circles = $state([]);
  let sharer_email = $state('');
  let usernameSubmit = $state('');
  let levels = ['friends', 'close friends'];

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (!evt.target) return;

    const form = evt.target as HTMLFormElement;

    const note = (new FormData(form).get('note') ?? '') as string;
    if (!note) return;

    const { error } = await supabase.from('notes').insert({ note });
    if (error) console.error(error);

    invalidate('supabase:db:notes');
    form.reset();
  };

  const handleSubmitCircle: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (!evt.target) return;

    const form = evt.target as HTMLFormElement;

    const circles = (new FormData(form).getAll('circles') ?? '') as string[];
    if (!circles) return;

    const sharer_email = (new FormData(form).get('sharer_email') ?? '') as string;
    if (!sharer_email) return;

    const { error } = await supabase.from('acl').insert({ sharer_email, circles });
    if (error) console.error(error);

    invalidate('supabase:db:acl');
    form.reset();
  };

  const handleSubmitUsername: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (!evt.target) return;

    const form = evt.target as HTMLFormElement;

    const username = (new FormData(form).get('username') ?? '') as string;
    if (!username) return;

    const { error } = await supabase.from('usernames').insert({ username });
    if (error) console.error(error);

    invalidate('supabase:db:usernames');
    form.reset();
  };
</script>

<h1>Private page for user: {user?.email}</h1>

<!-- <h2>Notes</h2>
<ul>
	{#each notes as note}
		<li>{note.note}</li>
	{/each}
</ul>
<form onsubmit={handleSubmit}>
	<label>
		Add a note
		<input name="note" type="text" />
	</label>
</form> -->

<h2>
  Your Username:
  {#if username.length > 0}
    <a href="/u/{username[0].username}">{username[0].username}</a>
  {:else}
    Username not yet set.
  {/if}
</h2>
<form id="usernameInfo" onsubmit={handleSubmitUsername}>
  <label>
    <input type="text" name="username" bind:value={usernameSubmit} />
  </label>
</form>
<button type="submit" form="usernameInfo" value="Submit">Submit</button>

<h2>My Circles</h2>
<ul>
  {#each acls as acl}
    <li>
      {acl.sharer_email}:
      {#each acl.circles as circle}
        <span>{circle}</span>
      {/each}
    </li>
  {/each}
</ul>

<h2>Sharing Options</h2>
<form id="sharerInfo" onsubmit={handleSubmitCircle}>
  <label>
    <input type="text" name="sharer_email" bind:value={sharer_email} />
  </label>
  {#each levels as level}
    <label>
      <input type="checkbox" name="circles" value={level} bind:group={circles} />
      {level}
    </label>
  {/each}
</form>
<button type="submit" form="sharerInfo" value="Submit">Submit</button>

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
