import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";

export default defineConfig({
  integrations: [react(), tailwind(), icon()],
  vite: {
    ssr: {
      noExternal: ['@astrojs/prism']
    }
  },
  // TypeScript 설정 추가
  typescript: {
    strict: true,
  }
});