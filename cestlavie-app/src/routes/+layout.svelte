<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script>
	import { run } from 'svelte/legacy';
	import { siteTitle, siteURL, siteAuthor, siteDescription, faviconImage, siteImageWidth } from '$lib/config.js';
	// use default svelte-material-ui css
	import '$lib/../../node_modules/svelte-material-ui/bare.css';
	import Header from '$lib/components/Header.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { currentPage, isMenuOpen } from '$lib/assets/js/store';
	import { navItems } from '$lib/config';
	import { preloadCode, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	const transitionIn = { delay: 150, duration: 150 };
	const transitionOut = { duration: 100 };

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	run(() => {
		currentPage.set(data.path);
	});

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
	<link rel="stylesheet" href="/css/animation.css" />
	<link rel="stylesheet" href="/css/components.css" />
	<link rel="stylesheet" href="/css/fonts.css" />
	<link rel="stylesheet" href="/css/header-and-footer.css" />
	<link rel="stylesheet" href="/css/layout.css" />
	<link rel="stylesheet" href="/css/root.css" />
	<link rel="stylesheet" href="/css/typography.css" />
	<link rel="stylesheet" href="/css/utilities.css" />
	<link rel="stylesheet" href="/css/vars.css" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
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
	<div class="login">
		<div class="buttons">
			<button id="login" onclick={() => open('/login')}>{user?.email || 'Login'}</button>
			{#if user?.email}
				<button id="logout" onclick={logout}>Logout</button>
			{/if}
		</div>
	</div>
	<Header />
	{#key data.path}
		<main id="main" tabindex="-1" in:fade|global={transitionIn} out:fade|global={transitionOut}>
			{@render children()}
		</main>
	{/key}
	<!-- <Footer /> -->
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
</style>