<template>
    <div class="min-h-screen bg-background text-foreground flex flex-col">
        <Header :active-preset="activePreset" @select-preset="activePreset = $event" />

        <main class="max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6 flex-1">
            <PreviewStage :config="config" :active-preset="activePreset" />

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div class="lg:col-span-7">
                    <Controls v-model="config" @reset-defaults="resetToDefaults" />
                </div>
                <div class="lg:col-span-5">
                    <CodeSnippet :config="config" />
                </div>
            </div>
        </main>

        <footer class="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
            <span>vue-fast-marquee playground</span>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MarqueeConfig, PresetType } from './types';
import Header from './components/Header.vue';
import PreviewStage from './components/PreviewStage.vue';
import Controls from './components/Controls.vue';
import CodeSnippet from './components/CodeSnippet.vue';

const activePreset = ref<PresetType>('tech');

const createDefaultConfig = (): MarqueeConfig => ({
    play: true,
    pauseOnHover: true,
    pauseOnClick: false,
    autoFill: false,
    draggable: false,
    direction: 'left',
    speed: 50,
    delay: 0,
    loop: 0,
    gradient: true,
    gradientColor: '#ffffff',
    gradientColorDark: '#171717',
    gradientWidth: 100,
});

const config = ref<MarqueeConfig>(createDefaultConfig());

const resetToDefaults = () => {
    config.value = createDefaultConfig();
};
</script>
