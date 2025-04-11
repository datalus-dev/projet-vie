<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { EventHandler } from 'svelte/elements';

  let { data } = $props();
  let { acls, supabase, user, usernames } = $derived(data);
  let username = $state('');
  
  if (usernames.length > 0) {
    username = usernames[0].username;
  }

  let circles = $state([]);
  let sharer_email = $state('');
  let usernameSubmit = $state('');
  let levels = ['friends', 'close friends'];

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

<div class="panels">
  <div>
    <h2>
      Your Username:
      {#if username.length > 0}
        <a href="/u/{username}">{username}</a>
      {:else}
        Username not yet set.
      {/if}
    </h2>
  <form id="usernameInfo" onsubmit={handleSubmitUsername}>
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
      <legend class="fieldset-legend">Username</legend>
      <label>
        <input
          type="text"
          name="username"
          class="input"
          placeholder={username || 'your_username'}
          bind:value={usernameSubmit}
        />
      </label>
      {#if username.length > 0}
        <p class="fieldset-label">
          Your current username is "{username}". Hitting "Submit" change your username.
        </p>
      {:else}
        <p class="fieldset-label">Your username must be unique.</p>
      {/if}
      <button type="submit" form="usernameInfo" class="btn" value="Submit">Submit</button>
    </fieldset>
  </form>
  </div>

  <div>
    <h2>Sharing Options</h2>
    <form id="sharerInfo" onsubmit={handleSubmitCircle}>
      <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Send To</legend>
        <label>
          <input
            type="text"
            name="sharer_email"
            class="input"
            placeholder="your_friend@mail.com"
            bind:value={sharer_email}
          />
        </label>
        {#each levels as level}
          <label>
            <input type="checkbox" name="circles" class="checkbox" value={level} bind:group={circles} />
            {level}
          </label>
        {/each}
        <button type="submit" form="sharerInfo" class="btn" value="Submit">Submit</button>
      </fieldset>
    </form>
  </div>
</div>

<div>
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
</div>

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

  .panels {
    display: grid;
  }

  button {
    border: solid;
    border-width: 1px;
  }
</style>
