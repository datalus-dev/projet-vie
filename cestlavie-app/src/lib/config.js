/**
 * Common store for site attributes
 *
 **/
import HomeSvg from '$lib/components/svg/HomeSVG.svelte';
import StubSvg from '$lib/components/svg/StubSVG.svelte';
import TagSvg from '$lib/components/svg/TagSVG.svelte';
import SettingsSvg from '$lib/components/svg/SettingsSVG.svelte';
import ScrapbookSvg from '$lib/components/svg/ScrapbookSVG.svelte';
import MapSvg from './components/svg/MapSVG.svelte';
import CalendarSvg from './components/svg/CalendarSVG.svelte';
import PassportSvg from './components/svg/PassportSVG.svelte';

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
    svg: HomeSvg,
    public: true
  },
  {
    title: 'Stubs',
    route: '/u/teon/stubs',
    svg: StubSvg,
    public: false
  },
  {
    title: 'Passport',
    route: '/u/teon/passport',
    svg: PassportSvg,
    public: false
  },
  {
    title: 'Scrapbook',
    route: '/u/teon/scrapbook',
    svg: ScrapbookSvg,
    public: false
  },
  // // when logged in, the public routes should collapsed under one menu
  // {
  //   title: 'Maps',
  //   route: '/maps',
  //   svg: MapSvg,
  //   public: true,
  // },
  // {
  //   title: 'Calendars',
  //   route: '/calendars',
  //   svg: CalendarSvg,
  //   public: true
  // },
  // {
  //   title: 'Passports',
  //   route: '/passports',
  //   svg: PassportSvg,
  //   public: true
  // },
  {
    title: 'Settings',
    route: '/private',
    svg: SettingsSvg,
    public: true
  }
];

export const footer = [
  {
    title: 'About',
    route: '/about'
  }
];
