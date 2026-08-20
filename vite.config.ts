import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isPlayground = mode === 'playground';

    return {
        base: isPlayground ? '/vue-fast-marquee/' : '/',
        plugins: [
            vue(),
            tailwindcss(),
            ...(!isPlayground
                ? [
                      dts({
                          insertTypesEntry: true,
                          cleanVueFileName: true,
                          include: ['src'],
                      }),
                  ]
                : []),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./playground', import.meta.url)),
            },
        },
        build: isPlayground
            ? {
                  outDir: 'dist-playground',
              }
            : {
                  lib: {
                      entry: resolve(import.meta.dirname, './src/index.ts'),
                      formats: ['es'],
                  },
                  outDir: 'dist',
                  rollupOptions: {
                      external: ['vue'],
                  },
              },
    };
});
