<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script>
  // include daisyui, tailwind css
  import '../style.css';
  import {
    siteTitle,
    siteURL,
    siteAuthor,
    siteDescription,
    faviconImage,
    siteImageWidth
  } from '$lib/config.js';
  import { page } from '$app/state';
  import { navItems } from '$lib/config';
  import { preloadCode, invalidate, goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import HomeSVG from '$lib/components/svg/HomeSVG.svelte';
  import NewSVG from '$lib/components/svg/NewSVG.svelte';
  import StubSVG from '$lib/components/svg/StubSVG.svelte';
  import TagSVG from '$lib/components/svg/TagSVG.svelte';
  import ScrapbookSVG from '$lib/components/svg/ScrapbookSVG.svelte';
  import SettingsSVG from '$lib/components/svg/SettingsSVG.svelte';

  let { data, children } = $props();
  let { session, supabase, user } = $derived(data);
  // Figure out how to load username to the layout.server.ts
  let username = $state('teon');

  // if (usernames.length > 0) {
  //   username = usernames[0].username;
  // }

  /**
   * This pre-fetches all top-level routes on the site in the background for faster loading.
   * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
   *
   * Any route added in src/lib/config.js will be preloaded automatically. You can add your
   * own preloadData() calls here, too.
   **/
  onMount(() => {
    const navRoutes = navItems.map((item) => item.route);
    preloadCode(...navRoutes);

    // Needed for Supabase
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => data.subscription.unsubscribe();
  });

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/fonts.css" />
  <link rel="stylesheet" href="/css/vars.css" />

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta data-key="description" name="description" content={siteDescription} />
  <meta name="author" content={siteAuthor} />
  <!-- Favicon -->
  <link rel="icon" type="image/svg" href={faviconImage} />
  <!-- Open Graph -->
  <meta property="og:type" content="profile" />
  <meta property="og:url" content={siteURL} />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={siteDescription} />
  <meta property="og:image" content={faviconImage} />
  <meta property="og:image:width" content={siteImageWidth} />
  <meta property="og:image:height" content={siteImageWidth} />
</svelte:head>

<div class="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <div class="body">
      <div class="login">
        <button class="btn btn-xs" id="login" onclick={() => goto('/login')}
          >{user?.email || 'Login'}</button
        >
        {#if user?.email}
          <button class="btn btn-xs" id="logout" onclick={logout}>Logout</button>
        {/if}
      </div>
      {#if user?.email}
        <button
          class="btn btn-circle btn-sm create"
          aria-label="Add new travel"
          onclick={() => goto('/new')}
        >
          <NewSVG />
        </button>
      {/if}
      <div class="main-content">
        {@render children()}
      </div>
    </div>
    <div class="dock dock-md bg-base-200 lg:hidden">
      <!-- #TODO: consider making a snippet to pass in content here -->
      <!-- {#if user?.email} -->
      {#each navItems as navItem}
        {#if page.url.pathname === navItem.route}
          <button class="dock-active" onclick={() => goto(navItem.route)}>
            <navItem.svg />
            <span class="dock-label">{navItem.title}</span>
          </button>
        {:else}
          <button onclick={() => goto(navItem.route)}>
            <navItem.svg />
            <span class="dock-label">{navItem.title}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-92/100 w-42 p-8">
      <!-- Sidebar content here -->
      {#each navItems as navItem}
        <!-- {#if user?.email || navItem.public} -->
        <li><a href={navItem.route}><navItem.svg />{navItem.title}</a></li>
        <!-- {/if} -->
      {/each}
    </ul>
    <!-- #TODO: Fix the footer position -->
    <footer class="footer bg-base-200">
      <p>a <a href="https://datalus.xyz"><em>datalus</em></a> endeavor.</p>
    </footer>
  </div>
</div>

<style>
  .login {
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .login button {
    /* border: thin dashed;
    border-color: black;
    border-radius: 8px; */
    margin: 0.25rem;
  }

  .body {
    min-height: 100dvh;
  }

  .main-content {
    padding: 2rem 2rem 5rem 2rem;
  }

  .create {
    position: -webkit-sticky;
    position: sticky;
    top: 86dvh;
    left: 90dvw;
    z-index: 9999;
  }

  :global {
    button {
      cursor: pointer;
    }
  }
</style>
