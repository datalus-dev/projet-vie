import type { Preview } from '@storybook/svelte';

const preview: Preview = {
    parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},

    tags: ['autodocs', 'autodocs', 'autodocs', 'autodocs']
};

export default preview;
