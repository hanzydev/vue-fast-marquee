<template>
    <div class="inline-flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg mx-2 select-none">
        <span class="text-lg">{{ item.icon }}</span>
        <div class="flex flex-col">
            <span class="text-sm font-medium text-foreground leading-tight">{{ item.title }}</span>
            <span class="text-xs text-muted-foreground leading-tight">{{ item.desc }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item: {
        id: number;
        title: string;
        desc: string;
        icon: string;
    };
}>();
</script>
