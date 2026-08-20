<template>
    <Card class="overflow-hidden border-border bg-card">
        <CardHeader class="flex-row items-center justify-between border-b border-border px-6 py-4 space-y-0">
            <div class="flex items-center gap-2">
                <span
                    class="w-2 h-2 rounded-full transition-colors"
                    :class="config.play ? 'bg-emerald-500' : 'bg-muted-foreground'"
                />
                <span class="text-sm font-medium text-foreground">Preview</span>
            </div>

            <div class="flex items-center gap-2">
                <Badge variant="outline" class="font-mono text-xs"> {{ config.speed }} px/s </Badge>
                <Badge variant="outline" class="font-mono text-xs uppercase">
                    {{ config.direction }}
                </Badge>
                <Badge v-if="config.autoFill" variant="secondary" class="text-xs"> auto-fill </Badge>
            </div>
        </CardHeader>

        <div
            class="relative py-8 transition-colors flex items-center"
            :class="{ 'h-64 justify-center': isVertical }"
            :style="{ backgroundColor: config.gradient ? config.gradientColor : 'transparent' }"
        >
            <Marquee
                :play="config.play"
                :direction="config.direction"
                :speed="config.speed"
                :delay="config.delay"
                :loop="config.loop"
                :pause-on-hover="config.pauseOnHover"
                :pause-on-click="config.pauseOnClick"
                :auto-fill="config.autoFill"
                :gradient="config.gradient"
                :gradient-color="config.gradientColor"
                :gradient-width="config.gradientWidth"
            >
                <!-- Tech Preset -->
                <template v-if="activePreset === 'tech'">
                    <TechItem v-for="item in techItems" :key="item.id" :item="item" />
                </template>

                <!-- Crypto Preset -->
                <template v-else-if="activePreset === 'crypto'">
                    <CryptoItem v-for="item in cryptoItems" :key="item.symbol" :item="item" />
                </template>

                <!-- Testimonials Preset -->
                <template v-else-if="activePreset === 'testimonials'">
                    <ReviewItem v-for="item in testimonialItems" :key="item.id" :item="item" />
                </template>

                <!-- Features Preset -->
                <template v-else-if="activePreset === 'features'">
                    <FeatureItem v-for="item in featureItems" :key="item.id" :item="item" />
                </template>
            </Marquee>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Marquee from '../../src/Marquee.vue';
import type { MarqueeConfig, PresetType } from '../types';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TECH_ITEMS, CRYPTO_ITEMS, TESTIMONIAL_ITEMS, FEATURE_ITEMS } from '../data/presets';
import TechItem from './items/TechItem.vue';
import CryptoItem from './items/CryptoItem.vue';
import ReviewItem from './items/ReviewItem.vue';
import FeatureItem from './items/FeatureItem.vue';

const props = defineProps<{
    config: MarqueeConfig;
    activePreset: PresetType;
}>();

const techItems = TECH_ITEMS;
const cryptoItems = CRYPTO_ITEMS;
const testimonialItems = TESTIMONIAL_ITEMS;
const featureItems = FEATURE_ITEMS;

const isVertical = computed(() => props.config.direction === 'up' || props.config.direction === 'down');
</script>
