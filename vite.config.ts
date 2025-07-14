import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
const packageJson:{name:string} = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: packageJson.name,
      fileName: (format) => `${packageJson.name}.${format}.js`,
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
