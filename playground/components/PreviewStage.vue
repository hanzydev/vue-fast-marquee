<template>
    <Card class="overflow-hidden border-border bg-card">
        <CardHeader
            class="flex-row items-center justify-between border-b border-border px-6 py-3.5 space-y-0 flex-wrap gap-3"
        >
            <div class="flex items-center gap-2 flex-wrap">
                <span
                    class="w-2 h-2 rounded-full transition-colors"
                    :class="config.play ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'"
                />
                <span class="text-sm font-medium text-foreground">Preview</span>

                <div class="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" class="font-mono text-xs"> {{ config.speed }} px/s </Badge>
                    <Badge variant="outline" class="font-mono text-xs uppercase">
                        {{ config.direction }}
                    </Badge>
                    <Badge v-if="config.draggable" variant="secondary" class="text-xs"> draggable </Badge>
                    <Badge v-if="config.autoFill" variant="secondary" class="text-xs"> auto-fill </Badge>
                    <Badge v-if="cycleCount > 0" variant="secondary" class="font-mono text-xs">
                        cycles: {{ cycleCount }}
                    </Badge>
                    <Badge v-if="isFinished" variant="destructive" class="text-xs"> finished </Badge>
                </div>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
                <Button
                    variant="outline"
                    size="sm"
                    class="h-7 text-xs font-mono gap-2 px-2.5"
                    @click="marqueeRef?.play()"
                >
                    <Play class="h-3 w-3 text-emerald-500" />
                    <span>play()</span>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    class="h-7 text-xs font-mono gap-2 px-2.5"
                    @click="marqueeRef?.pause()"
                >
                    <Pause class="h-3 w-3 text-amber-500" />
                    <span>pause()</span>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    class="h-7 text-xs font-mono gap-2 px-2.5"
                    @click="marqueeRef?.toggle()"
                >
                    <RefreshCw class="h-3 w-3 text-blue-500" />
                    <span>toggle()</span>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    class="h-7 text-xs font-mono gap-2 px-2.5"
                    @click="marqueeRef?.reset()"
                >
                    <RotateCcw class="h-3 w-3 text-purple-500" />
                    <span>reset()</span>
                </Button>
            </div>
        </CardHeader>

        <div
            class="relative py-8 transition-colors flex items-center justify-center overflow-hidden"
            :class="{ 'h-80': isVertical, 'min-h-32': !isVertical }"
            :style="{
                backgroundColor: activeGradientBg,
            }"
        >
            <Marquee
                ref="marqueeRef"
                :play="config.play"
                :direction="config.direction"
                :speed="config.speed"
                :delay="config.delay"
                :loop="config.loop"
                :pause-on-hover="config.pauseOnHover"
                :pause-on-click="config.pauseOnClick"
                :auto-fill="config.autoFill"
                :draggable="config.draggable"
                :gradient="config.gradient"
                :gradient-color="config.gradientColor"
                :gradient-color-dark="config.gradientColorDark"
                :gradient-width="config.gradientWidth"
                @cycle-complete="onCycleComplete"
                @finish="onFinish"
            >
                <template v-if="activePreset === 'tech'">
                    <TechItem v-for="item in techItems" :key="item.id" :item="item" />
                </template>

                <template v-else-if="activePreset === 'crypto'">
                    <CryptoItem v-for="item in cryptoItems" :key="item.symbol" :item="item" />
                </template>

                <template v-else-if="activePreset === 'testimonials'">
                    <ReviewItem v-for="item in testimonialItems" :key="item.id" :item="item" />
                </template>

                <template v-else-if="activePreset === 'features'">
                    <FeatureItem v-for="item in featureItems" :key="item.id" :item="item" />
                </template>
            </Marquee>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Marquee from '../../src/Marquee.vue';
import type { MarqueeConfig, PresetType } from '../types';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, RotateCcw } from '@lucide/vue';
import { TECH_ITEMS, CRYPTO_ITEMS, TESTIMONIAL_ITEMS, FEATURE_ITEMS } from '../data/presets';
import TechItem from './items/TechItem.vue';
import CryptoItem from './items/CryptoItem.vue';
import ReviewItem from './items/ReviewItem.vue';
import FeatureItem from './items/FeatureItem.vue';

import { useDark } from '@vueuse/core';

const props = defineProps<{
    config: MarqueeConfig;
    activePreset: PresetType;
}>();

const marqueeRef = ref<InstanceType<typeof Marquee>>();
const isDark = useDark();

const techItems = TECH_ITEMS;
const cryptoItems = CRYPTO_ITEMS;
const testimonialItems = TESTIMONIAL_ITEMS;
const featureItems = FEATURE_ITEMS;

const cycleCount = ref(0);
const isFinished = ref(false);

const onCycleComplete = () => {
    cycleCount.value++;
};

const onFinish = () => {
    isFinished.value = true;
};

watch(
    () => [props.config.loop, props.config.direction, props.config.speed, props.activePreset],
    () => {
        isFinished.value = false;
    },
);

const isVertical = computed(() => props.config.direction === 'up' || props.config.direction === 'down');

const activeGradientBg = computed(() => {
    if (!props.config.gradient) return 'transparent';
    return isDark.value
        ? props.config.gradientColorDark || props.config.gradientColor || 'transparent'
        : props.config.gradientColor || 'transparent';
});
</script>
