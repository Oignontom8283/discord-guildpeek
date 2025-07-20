import { defineConfig } from 'vite';
import path from 'path';
import { version } from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: "discordguildpeek",
      fileName: (format) => `discord-guildpeek-${version}.${format}.js`,
      formats: ['umd', 'es'], // UMD for browser compatibility, ES for modern module systems
    },
    outDir: 'dist/browser',
    rollupOptions: {
      output: {
        globals: {
          lodash: '_',
        },
      },
      external: ['lodash'], // Exclude lodash from the bundle
    },
  },
});
