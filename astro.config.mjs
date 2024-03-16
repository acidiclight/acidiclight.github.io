import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://acidiclight.dev',
  markdown: {
    shikiConfig: {
      theme: 'min-dark',
      wrap: false
    }
  },
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  }), icon()]
});