<template>
    <Card class="border-border bg-card">
        <CardHeader class="flex-row items-center justify-between border-b border-border px-6 py-4 space-y-0">
            <CardTitle class="text-base font-semibold">Controls</CardTitle>
            <Button variant="outline" size="sm" @click="$emit('reset-defaults')"> Reset </Button>
        </CardHeader>

        <CardContent class="p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-center justify-between space-x-2 rounded-lg border border-border p-3">
                    <Label for="play-switch" class="text-sm font-medium cursor-pointer">Play</Label>
                    <Switch id="play-switch" v-model="config.play" />
                </div>

                <div class="flex items-center justify-between space-x-2 rounded-lg border border-border p-3">
                    <Label for="hover-switch" class="text-sm font-medium cursor-pointer">Pause on hover</Label>
                    <Switch id="hover-switch" v-model="config.pauseOnHover" />
                </div>

                <div class="flex items-center justify-between space-x-2 rounded-lg border border-border p-3">
                    <Label for="click-switch" class="text-sm font-medium cursor-pointer">Pause on click</Label>
                    <Switch id="click-switch" v-model="config.pauseOnClick" />
                </div>

                <div class="flex items-center justify-between space-x-2 rounded-lg border border-border p-3">
                    <Label for="autofill-switch" class="text-sm font-medium cursor-pointer">Auto fill</Label>
                    <Switch id="autofill-switch" v-model="config.autoFill" />
                </div>

                <div
                    class="flex items-center justify-between space-x-2 rounded-lg border border-border p-3 sm:col-span-2"
                >
                    <Label for="draggable-switch" class="text-sm font-medium cursor-pointer">Draggable</Label>
                    <Switch id="draggable-switch" v-model="config.draggable" />
                </div>
            </div>

            <Separator />

            <div class="space-y-2">
                <Label class="text-sm font-medium text-muted-foreground">Direction</Label>
                <Select v-model="config.direction">
                    <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left (Default)</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="up">Up (Vertical)</SelectItem>
                        <SelectItem value="down">Down (Vertical)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between items-center text-sm">
                        <Label class="text-muted-foreground font-medium">Speed</Label>
                        <span class="font-mono text-muted-foreground">{{ config.speed }} px/s</span>
                    </div>
                    <Slider
                        :model-value="[config.speed]"
                        :min="10"
                        :max="300"
                        :step="5"
                        @update:model-value="config.speed = $event?.[0] ?? config.speed"
                    />
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between items-center text-sm">
                        <Label class="text-muted-foreground font-medium">Delay</Label>
                        <span class="font-mono text-muted-foreground">{{ config.delay }}s</span>
                    </div>
                    <Slider
                        :model-value="[config.delay]"
                        :min="0"
                        :max="5"
                        :step="0.5"
                        @update:model-value="config.delay = $event?.[0] ?? config.delay"
                    />
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between items-center text-sm">
                        <Label class="text-muted-foreground font-medium">Loop Count</Label>
                        <span class="font-mono text-muted-foreground">{{
                            config.loop === 0 ? 'Infinite (0)' : `${config.loop}`
                        }}</span>
                    </div>
                    <Slider
                        :model-value="[config.loop]"
                        :min="0"
                        :max="10"
                        :step="1"
                        @update:model-value="config.loop = $event?.[0] ?? config.loop"
                    />
                </div>
            </div>

            <Separator />

            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <Label for="gradient-switch" class="text-sm font-medium cursor-pointer">Gradient Mask</Label>
                        <p class="text-xs text-muted-foreground">Fades edges seamlessly</p>
                    </div>
                    <Switch id="gradient-switch" v-model="config.gradient" />
                </div>

                <div v-if="config.gradient" class="space-y-4 pt-2">
                    <div class="space-y-2">
                        <div class="flex justify-between items-center text-sm">
                            <Label class="text-muted-foreground">Gradient Width</Label>
                            <span class="font-mono text-muted-foreground">{{ config.gradientWidth }}px</span>
                        </div>
                        <Slider
                            :model-value="[config.gradientWidth]"
                            :min="20"
                            :max="300"
                            :step="10"
                            @update:model-value="config.gradientWidth = $event?.[0] ?? config.gradientWidth"
                        />
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between gap-2">
                            <Label class="text-sm text-muted-foreground">Gradient Color (Light):</Label>
                            <div class="flex items-center gap-2.5">
                                <span class="text-xs font-mono text-muted-foreground uppercase">{{
                                    config.gradientColor
                                }}</span>
                                <input
                                    type="color"
                                    v-model="config.gradientColor"
                                    class="w-7 h-7 rounded-md border border-border cursor-pointer bg-transparent p-0"
                                />
                            </div>
                        </div>

                        <div class="flex items-center justify-between gap-2">
                            <Label class="text-sm text-muted-foreground">Gradient Color (Dark):</Label>
                            <div class="flex items-center gap-2.5">
                                <span class="text-xs font-mono text-muted-foreground uppercase">{{
                                    config.gradientColorDark
                                }}</span>
                                <input
                                    type="color"
                                    v-model="config.gradientColorDark"
                                    class="w-7 h-7 rounded-md border border-border cursor-pointer bg-transparent p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import type { MarqueeConfig } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const config = defineModel<MarqueeConfig>({ required: true });

defineEmits<{
    (e: 'reset-defaults'): void;
}>();
</script>
