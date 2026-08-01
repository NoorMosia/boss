import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://boss.tszuk.co.za',
  output: 'static',
  build: {
    assets: '_assets'
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});
