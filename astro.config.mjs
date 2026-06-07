import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://ajay-mk.github.io',
  integrations: [icon()],
});
