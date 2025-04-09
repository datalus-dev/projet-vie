/**
 * Common store for site attributes
 *
 **/

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
    route: '/'
  },
  {
    title: 'Stubs',
    route: '/u/teon/stubs'
  },
  {
    title: 'Tags',
    route: '/u/teon/tags'
  },
  {
    title: 'Users',
    route: '/users'
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
