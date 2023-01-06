import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/index.ts'],
    outDir: './lib',
    format: ['cjs'],
    legacyOutput: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    dts: false,
    minify: true,
  },
  {
    name: 'esm',
    entry: ['./src/index.ts'],
    outDir: './es',
    format: ['esm'],
    legacyOutput: false,
    sourcemap: true,
    clean: true,
    splitting: false,
    dts: false,
    minify: true,
  },
  {
    name: 'typedefs',
    entry: ['./src/index.ts'],
    outDir: './lib',
    clean: false,
    dts: {
      only: true,
    },
  },
]);
