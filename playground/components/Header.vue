<template>
    <header class="border-b border-border bg-background sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <!-- Brand & Title -->
            <div class="flex items-center gap-3">
                <span class="font-semibold text-sm tracking-tight text-foreground"> vue-fast-marquee </span>
                <Badge variant="secondary"> v1.0.6 </Badge>
                <span class="text-sm text-muted-foreground hidden sm:inline-block"> Playground </span>
            </div>

            <!-- Preset Selector Tabs -->
            <Tabs :model-value="activePreset" @update:model-value="$emit('select-preset', $event as PresetType)">
                <TabsList>
                    <TabsTrigger value="tech"> Tech </TabsTrigger>
                    <TabsTrigger value="crypto"> Crypto </TabsTrigger>
                    <TabsTrigger value="testimonials"> Reviews </TabsTrigger>
                    <TabsTrigger value="features"> Features </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { PresetType } from '../types';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

defineProps<{
    activePreset: PresetType;
}>();

defineEmits<{
    (e: 'select-preset', preset: PresetType): void;
}>();
</script>
