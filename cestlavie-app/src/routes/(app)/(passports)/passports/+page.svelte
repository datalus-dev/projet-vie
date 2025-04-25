<script>
  import Passport from '$lib/components/Passport.svelte';
  let {
    passports = [
      { title: 'Travel', emoji: '🧳', route: '/u/teon/passport' },
      { title: 'National Parks', emoji: '🌳', route: '#' },
      { title: 'Amtrak', emoji: '🚂', route: '#' }
    ]
  } = $props();
  import { goto } from '$app/navigation';
</script>

<title>Passports</title>
<h1>Passports</h1>

<p>Check out our collection of passports: WIP.</p>

<p>Passports are collections of related activities.</p>

<div class="passports">
  {#each passports as passport}
    <button
      aria-label={`${passport.title} Passport button`}
      onclick={() => goto(passport.route)}
    >
      <Passport {...passport} />
    </button>
  {/each}
</div>

<style>
  .passports {
    display: grid;
    column-gap: 2rem;
    row-gap: 2rem;
    grid-template-columns: repeat(auto-fit, 20rem);
    justify-content: center;
    padding: 2rem;
  }
</style>
