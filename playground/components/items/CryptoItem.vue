<template>
    <div
        class="inline-flex items-center gap-4 px-4 py-3 bg-card border border-border rounded-lg mx-2 my-1 shrink-0 select-none shadow-xs"
    >
        <div class="flex flex-col">
            <span class="text-sm font-semibold text-foreground tracking-wide">{{ item.symbol }}</span>
            <span class="text-xs text-muted-foreground">{{ item.name }}</span>
        </div>
        <div class="flex flex-col items-end">
            <span class="text-xs font-mono font-medium text-foreground">{{ item.price }}</span>
            <span class="text-xs font-mono font-semibold" :class="item.up ? 'text-emerald-500' : 'text-rose-500'">
                {{ item.up ? '▲' : '▼' }} {{ item.change }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item: {
        symbol: string;
        name: string;
        price: string;
        change: string;
        up: boolean;
    };
}>();
</script>
