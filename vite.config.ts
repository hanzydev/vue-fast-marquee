import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        dts({
            insertTypesEntry: true,
            cleanVueFileName: true,
            include: ['src'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./playground', import.meta.url)),
        },
    },
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
