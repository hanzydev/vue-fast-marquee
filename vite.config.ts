import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            cleanVueFileName: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, './src/index.ts'),
            formats: ['es'],
        },
        outDir: 'dist',
        rollupOptions: {
            external: ['vue'],
        },
    },
});
