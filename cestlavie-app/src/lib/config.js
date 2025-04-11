/**
 * Common store for site attributes
 *
 **/
import HomeSVG from '$lib/components/svg/HomeSVG.svelte';
import StubSVG from '$lib/components/svg/StubSVG.svelte';
import TagSVG from '$lib/components/svg/TagSVG.svelte';
import SettingsSVG from '$lib/components/svg/SettingsSVG.svelte';
import ScrapbookSVG from '$lib/components/svg/ScrapbookSVG.svelte';

export const siteTitle = "C'est La Vie";
export const siteDescription = 'Personal Archive of Events and Life';
export const siteURL = 'https://cestlavie.app';
export const siteAuthor = 'Teon L Brooks';
export const siteImage = '/images/home.jpg';
export const siteImageWidth = '300px';
export const faviconImage = '/images/ticket.svg';

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
  {
    title: 'Home',
    route: '/',
    svg: HomeSVG,
    public: true
  },
  {
    title: 'Stubs',
    route: '/u/teon/stubs',
    svg: StubSVG,
    public: false
  },
  {
    title: 'Tags',
    route: '/u/teon/tags',
    svg: TagSVG,
    public: false
  },
  {
    title: 'Scrapbook',
    route: '/u/teon/carousel',
    svg: ScrapbookSVG,
    public: false
  },
  {
    title: 'Settings',
    route: '/private',
    svg: SettingsSVG,
    public: true
  }
  // }, {
  // 	title: 'Maps',
  // 	route: '/maps'
  // }, {
  // 	title: 'Calendars',
  // 	route: '/calendars'
  // }
];

export const footer = [
  {
    title: 'About',
    route: '/about'
  }
];
