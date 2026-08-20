<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<
        SwitchRootProps & {
            class?: HTMLAttributes['class'];
            size?: 'sm' | 'default';
        }
    >(),
    {
        size: 'default',
    },
);

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, size: __, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <SwitchRoot
        v-slot="slotProps"
        data-slot="switch"
        :data-size="size"
        v-bind="forwarded"
        :class="
            cn(
                'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/90 data-[state=checked]:border-primary border-2 data-[state=unchecked]:border-transparent focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 shrink-0 rounded-full focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-5 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-7 peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                props.class,
            )
        "
    >
        <SwitchThumb
            data-slot="switch-thumb"
            class="bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground rounded-full shadow-sm group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-6 group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-4 data-[state=checked]:translate-x-[calc(100%-8px)] data-[state=unchecked]:translate-x-0 not-dark:bg-clip-padding pointer-events-none block ring-0 transition-transform"
        >
            <slot name="thumb" v-bind="slotProps" />
        </SwitchThumb>
    </SwitchRoot>
</template>
