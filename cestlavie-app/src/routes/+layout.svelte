<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script>
	// include daisyui, tailwind css
	import "../style.css";
	import { siteTitle, siteURL, siteAuthor, siteDescription, faviconImage, siteImageWidth } from '$lib/config.js';
	import Header from '$lib/components/Header.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { currentPage, isMenuOpen } from '$lib/assets/js/store';
	import { navItems } from '$lib/config';
	import { preloadCode, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
      }
    }
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/fonts.css" />
	<link rel="stylesheet" href="/css/vars.css" />

  <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta data-key="description" name="description" content="{siteDescription}">
  <meta name="author" content={siteAuthor}>
  <!-- Favicon -->
  <link rel="icon" type="image/svg" href={faviconImage} />
	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={siteURL}>
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:image" content={faviconImage} />
	<meta property="og:image:width" content={siteImageWidth} />
	<meta property="og:image:height" content={siteImageWidth} />
</svelte:head>

<div class="layout" class:open={isMenuOpen}>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-side">
		  <!-- <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> -->
		  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			<!-- Sidebar content here -->
      {#each navItems as navItem}
			  <li><a href={navItem.route}>{navItem.title}</a></li>
      {/each}
		  </ul>
		</div>
  </div>
  <div class="body">
    <div class="login">
      <div class="buttons">
        <button id="login" onclick={() => location.href='/login'}>{user?.email || 'Login'}</button>
        {#if user?.email}
          <button id="logout" onclick={logout}>Logout</button>
        {/if}
      </div>
    </div>
    <div class="main-content">
      {@render children()}
    </div>
  </div>
  <div class="dock dock-md lg:hidden">
    <!-- <div class=""> -->
    {#each navItems as navItem}
      <button onclick={() => location.href=navItem.route}>
        <span class="dock-label">{navItem.title}</span>
      </button>
    {/each}
    <!-- </div> -->
  </div>

</div>
<style>
.login {
	display: grid;
	justify-content: center;
	align-items: center;
}

.buttons {
	width: auto;
	display: grid;
	padding: 0.5rem;
	/* border: solid;
	border-color: blue; */
}

button {
	border: thin dashed;
	border-color: black;
	border-radius: 8px;
	margin: 0.25rem;
}

.main-content {
  /* padding: 2rem; */
  width: 75vw;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: flex-start;
}

</style>