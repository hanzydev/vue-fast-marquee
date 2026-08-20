<template>
    <div
        class="inline-flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg mx-2 my-1 shrink-0 select-none shadow-xs"
    >
        <span class="text-lg">{{ item.icon }}</span>
        <div class="flex flex-col">
            <span class="text-sm font-medium text-foreground leading-tight">{{ item.name }}</span>
            <span class="text-xs text-muted-foreground font-mono leading-tight">{{ item.tag }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item: {
        id: string;
        name: string;
        tag: string;
        color: string;
        icon: string;
    };
}>();
</script>
