import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: "discordguildpeek",
      fileName: (format) => `discord-guildpeek.${format}.js`,
      formats: ['umd', 'es'], // UMD pour navigateur global, ES pour moderne
    },
    outDir: 'dist/browser',
    rollupOptions: {
      output: {
        globals: {
          // Exemple : dépendances externes
          lodash: '_',
        },
      },
      external: ['lodash'], // éviter de les inclure si déjà en CDN
    },
  },
});
