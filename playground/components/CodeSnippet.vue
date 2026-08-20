<template>
    <Card class="border-border bg-card">
        <CardHeader class="flex-row items-center justify-between border-b border-border px-6 py-4 space-y-0">
            <CardTitle class="text-base font-medium">Vue 3 Template</CardTitle>
            <Button variant="outline" size="sm" @click="copy(generatedCode)">
                {{ copied ? 'Copied' : 'Copy' }}
            </Button>
        </CardHeader>

        <CardContent class="p-0">
            <pre
                class="p-6 text-xs font-mono text-foreground overflow-x-auto rounded-b-xl leading-relaxed"
            ><code>{{ generatedCode }}</code></pre>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import type { MarqueeConfig } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const props = defineProps<{
    config: MarqueeConfig;
}>();

const { copy, copied } = useClipboard({ copiedDuring: 2000 });

const generatedCode = computed(() => {
    const c = props.config;
    const propsList: string[] = [];

    if (!c.play) propsList.push(':play="false"');
    if (c.direction !== 'left') {
        propsList.push(`direction="${c.direction}"`);
        if (c.direction === 'up' || c.direction === 'down') {
            propsList.push(':style="{ height: \'300px\' }"');
        }
    }
    if (c.speed !== 50) propsList.push(`:speed="${c.speed}"`);
    if (c.delay !== 0) propsList.push(`:delay="${c.delay}"`);
    if (c.loop !== 0) propsList.push(`:loop="${c.loop}"`);
    if (c.pauseOnHover) propsList.push('pause-on-hover');
    if (c.pauseOnClick) propsList.push('pause-on-click');
    if (c.autoFill) propsList.push('auto-fill');
    if (c.draggable) propsList.push('draggable');
    if (c.gradient) {
        propsList.push('gradient');
        if (c.gradientColor !== 'white') propsList.push(`gradient-color="${c.gradientColor}"`);
        if (c.gradientColorDark && c.gradientColorDark !== c.gradientColor) {
            propsList.push(`gradient-color-dark="${c.gradientColorDark}"`);
        }
        if (c.gradientWidth !== 200) propsList.push(`:gradient-width="${c.gradientWidth}"`);
    }

    const propsStr = propsList.length ? `\n        ${propsList.join('\n        ')}\n    ` : '    ';

    return `<script setup lang="ts">
    import { Marquee } from 'vue-fast-marquee';
<\/script>

<template>
    <Marquee${propsStr}>
        <div>Your Content</div>
    </Marquee>
</template>`;
});
</script>
