<template>
    <header class="border-b border-border bg-background sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <span class="font-semibold text-sm tracking-tight text-foreground"> vue-fast-marquee </span>
                <Badge variant="secondary"> v1.0.6 </Badge>
                <span class="text-sm text-muted-foreground hidden sm:inline-block"> Playground </span>
            </div>

            <div class="flex items-center gap-3">
                <Tabs :model-value="activePreset" @update:model-value="$emit('select-preset', $event as PresetType)">
                    <TabsList>
                        <TabsTrigger value="tech"> Tech </TabsTrigger>
                        <TabsTrigger value="crypto"> Crypto </TabsTrigger>
                        <TabsTrigger value="testimonials"> Reviews </TabsTrigger>
                        <TabsTrigger value="features"> Features </TabsTrigger>
                    </TabsList>
                </Tabs>

                <Button
                    variant="ghost"
                    size="icon"
                    class="h-9 w-9 text-muted-foreground hover:text-foreground"
                    @click="toggleDark()"
                >
                    <Sun v-if="isDark" class="h-4 w-4" />
                    <Moon v-else class="h-4 w-4" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { Sun, Moon } from '@lucide/vue';
import type { PresetType } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

defineProps<{
    activePreset: PresetType;
}>();

defineEmits<{
    (e: 'select-preset', preset: PresetType): void;
}>();

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
