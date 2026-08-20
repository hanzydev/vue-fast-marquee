<template>
    <div
        class="inline-flex flex-col gap-2 w-72 p-4 bg-card border border-border rounded-lg mx-2 my-1 shrink-0 select-none shadow-xs"
    >
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm border border-border">
                {{ item.avatar }}
            </div>
            <div class="flex flex-col flex-1 min-w-0">
                <span class="text-sm font-semibold text-foreground truncate">{{ item.name }}</span>
                <span class="text-xs text-muted-foreground truncate">{{ item.role }}</span>
            </div>
            <div class="flex text-amber-400 text-xs">
                <span v-for="s in item.rating" :key="s">★</span>
            </div>
        </div>
        <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">“{{ item.text }}”</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item: {
        id: number;
        name: string;
        role: string;
        avatar: string;
        rating: number;
        text: string;
    };
}>();
</script>
