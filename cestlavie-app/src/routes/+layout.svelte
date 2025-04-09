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

  let { data, children } = $props();
  let { session, supabase, user } = $derived(data);

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
        <button id="login" onclick={() => (location.href = '/login')}
          >{user?.email || 'Login'}</button
        >
        {#if user?.email}
          <button id="logout" onclick={logout}>Logout</button>
        {/if}
      </div>
      <div class="main-content">
        {@render children()}
      </div>
    </div>
    <div class="dock dock-md bg-base-200 lg:hidden">
      {#if page.url.pathname === '/'}
        <button class="dock-active" onclick={() => goto('/')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><polyline
                points="1 11 12 2 23 11"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="2"
              ></polyline><path
                d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></path><line
                x1="12"
                y1="22"
                x2="12"
                y2="18"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></line></g
            ></svg
          >
          <span class="dock-label">Home</span>
        </button>
      {:else}
        <button onclick={() => goto('/')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><polyline
                points="1 11 12 2 23 11"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="2"
              ></polyline><path
                d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></path><line
                x1="12"
                y1="22"
                x2="12"
                y2="18"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></line></g
            ></svg
          >
          <span class="dock-label">Home</span>
        </button>
      {/if}

      {#if page.url.pathname === '/users'}
        <button class="dock-active" onclick={() => goto('/users')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><polyline
                points="3 14 9 14 9 17 15 17 15 14 21 14"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="2"
              ></polyline><rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></rect></g
            ></svg
          >
          <span class="dock-label">Users</span>
        </button>
      {:else}
        <button onclick={() => goto('/users')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><polyline
                points="3 14 9 14 9 17 15 17 15 14 21 14"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="2"
              ></polyline><rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></rect></g
            ></svg
          >
          <span class="dock-label">Users</span>
        </button>
      {/if}

      {#if page.url.pathname == '/private'}
        <button class="dock-active" onclick={() => goto('/private')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></circle><path
                d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></path></g
            ></svg
          >
          <span class="dock-label">Settings</span>
        </button>
      {:else}
        <button onclick={() => goto('/private')}>
          <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
              ><circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></circle><path
                d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="2"
              ></path></g
            ></svg
          >
          <span class="dock-label">Settings</span>
        </button>
      {/if}
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <!-- Sidebar content here -->
      {#each navItems as navItem}
        <li><a href={navItem.route}>{navItem.title}</a></li>
      {/each}
    </ul>
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
    border: thin dashed;
    border-color: black;
    border-radius: 8px;
    margin: 0.25rem;
  }

  .main-content {
    padding: 2rem;
    /* width: 75vw; */
  }
</style>
