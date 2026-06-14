import { defineConfig } from 'astro/config';

// Project pages site served from https://brandonheyer.github.io/log/
// `base` makes every built-in link/asset resolve under the /log/ subpath.
// Build host-agnostic by always routing internal links through BASE_URL.
export default defineConfig({
  site: 'https://brandonheyer.github.io',
  base: '/log',
});
