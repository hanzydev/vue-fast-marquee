import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({ script: { propsDestructure: true } }),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: false,
            cleanVueFileName: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            formats: ['es', 'cjs'],
        },
        outDir: 'dist',
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
