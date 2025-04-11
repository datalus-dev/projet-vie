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
        <button class="btn btn-xs" id="login" onclick={() => goto('/login')}>{user?.email || 'Login'}</button>
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
      {#if page.url.pathname === '/'}
        <button class="dock-active" onclick={() => goto('/')}>
          <HomeSVG />
          <span class="dock-label">Home</span>
        </button>
      {:else}
        <button onclick={() => goto('/')}>
          <HomeSVG />
          <span class="dock-label">Home</span>
        </button>
      {/if}

      <!-- {#if user?.email} -->
        {#if page.url.pathname === `/u/${username}/stubs`}
          <button class="dock-active" onclick={() => goto(`/u/${username}/stubs`)}>
            <!-- #TODO: consider making a snippet to pass in content here -->
            <StubSVG />
            <span class="dock-label">Stubs</span>
          </button>
        {:else}
          <button onclick={() => goto(`/u/${username}/stubs`)}>
            <StubSVG />
            <span class="dock-label">Stubs</span>
          </button>
        {/if}

        {#if page.url.pathname === `/u/${username}/tags`}
          <button class="dock-active" onclick={() => goto(`/u/${username}/tags`)}>
            <!-- #TODO: consider making a snippet to pass in content here -->
            <TagSVG />
            <span class="dock-label">Tags</span>
          </button>
        {:else}
          <button onclick={() => goto(`/u/${username}/tags`)}>
            <TagSVG />
            <span class="dock-label">Tags</span>
          </button>
        {/if}

        {#if page.url.pathname === `/u/${username}/carousel`}
        <button class="dock-active" onclick={() => goto(`/u/${username}/carousel`)}>
          <!-- #TODO: consider making a snippet to pass in content here -->
          <ScrapbookSVG />
          <span class="dock-label">Tags</span>
        </button>
      {:else}
        <button onclick={() => goto(`/u/${username}/carousel`)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" id="Tag--Streamline-Atlas" height="16" width="16"><desc>Tag Streamline Icon: https://streamlinehq.com</desc><defs></defs><g id="price_tag"><path d="M2.13125 0.9375 0.9375 2.13125l0 4.76875L8.100000000000001 14.0625l5.9624999999999995 -5.9624999999999995L6.8999999999999995 0.9375l-4.76875 0z" stroke-miterlimit="10" fill="none" stroke="#000000" stroke-width="1"></path><path d="M2.725 3.9187499999999997a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="#000000" stroke-width="1"></path></g></svg>
          <span class="dock-label">Scrapbook</span>
        </button>
      {/if}
    <!-- {/if} -->

      {#if page.url.pathname == '/private'}
        <button class="dock-active" onclick={() => goto('/private')}>
          <SettingsSVG />
          <span class="dock-label">Settings</span>
        </button>
      {:else}
        <button onclick={() => goto('/private')}>
          <SettingsSVG />
          <span class="dock-label">Settings</span>
        </button>
      {/if}
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-90/100 w-42 p-8">
      <!-- Sidebar content here -->
      {#each navItems as navItem}
        <!-- {#if user?.email || navItem.public} -->
          <li><a href={navItem.route}><navItem.svg />{navItem.title}</a></li>
        <!-- {/if} -->
      {/each}
    </ul>
    <!-- #TODO: Fix the footer position -->
    <footer class="footer bg-base-200"><p>a <a href="https://datalus.xyz"><em>datalus</em></a> endeavor.</p></footer>
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
    top: 87dvh;
    left: 90dvw;
    z-index: 9999;
  }

</style>
