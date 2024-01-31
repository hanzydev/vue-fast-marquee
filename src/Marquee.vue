<template>
    <div
        ref="containerRef"
        :class="['vfm-marquee-container', className]"
        :style="containerStyle"
        v-if="isMounted"
    >
        <div :style="gradientStyle" class="vfm-overlay" v-if="gradient" />
        <div
            class="vfm-marquee"
            :style="marqueeStyle"
            @animationiteration="emit('cycleComplete')"
            @animationend="emit('finish')"
        >
            <div :style="parentStyle" class="vfm-parent" ref="marqueeRef">
                <slot />
            </div>
            <div
                :style="parentStyle"
                class="vfm-parent"
                v-for="_ in multiplyChildren(multiplier - 1)"
            >
                <slot />
            </div>
        </div>
        <div class="vfm-marquee" :style="marqueeStyle">
            <div :style="parentStyle" class="vfm-parent" v-for="_ in multiplyChildren(multiplier)">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { MarqueeProps } from './types';

const {
    style = () => ({}),
    class: className = '',
    autoFill = false,
    play = true,
    pauseOnHover = false,
    pauseOnClick = false,
    direction = 'left',
    speed = 50,
    delay = 0,
    loop = 0,
    gradient = false,
    gradientColor = 'white',
    gradientWidth = 200,
} = defineProps<MarqueeProps>();

const emit = defineEmits<{
    (event: 'finish'): void;
    (event: 'cycleComplete'): void;
}>();

const containerRef = ref<HTMLDivElement>();
const marqueeRef = ref<HTMLDivElement>();

const containerWidth = ref(0);
const marqueeWidth = ref(0);
const multiplier = ref(1);
const isMounted = ref(false);
const resizeObserver = ref<ResizeObserver>();

const duration = computed(() => {
    if (autoFill) {
        return (marqueeWidth.value * multiplier.value) / speed;
    } else {
        return marqueeWidth < containerWidth
            ? containerWidth.value / speed
            : marqueeWidth.value / speed;
    }
});

const containerStyle = computed(() => ({
    ...style,
    '--pause-on-hover': !play || pauseOnHover ? 'paused' : 'running',
    '--pause-on-click':
        !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? 'paused' : 'running',
    '--width': direction === 'up' || direction === 'down' ? `100vh` : '100%',
    '--transform':
        direction === 'up' ? 'rotate(-90deg)' : direction === 'down' ? 'rotate(90deg)' : 'none',
}));

const gradientStyle = computed(() => ({
    '--gradient-color': gradientColor,
    '--gradient-width': typeof gradientWidth === 'number' ? `${gradientWidth}px` : gradientWidth,
}));

const marqueeStyle = computed(() => ({
    '--play': play ? 'running' : 'paused',
    '--direction': direction === 'left' ? 'normal' : 'reverse',
    '--duration': `${duration.value}s`,
    '--delay': `${delay}s`,
    '--iteration-count': !!loop ? `${loop}` : 'infinite',
    '--min-width': autoFill ? `auto` : '100%',
}));

const parentStyle = computed(() => ({
    '--transform':
        direction === 'up' ? 'rotate(90deg)' : direction === 'down' ? 'rotate(-90deg)' : 'none',
}));

const calculateWidth = () => {
    if (marqueeRef.value && containerRef.value) {
        const containerRect = containerRef.value.getBoundingClientRect();
        const marqueeRect = marqueeRef.value.getBoundingClientRect();

        let _containerWidth = containerRect.width;
        let _marqueeWidth = marqueeRect.width;

        if (direction === 'up' || direction === 'down') {
            _containerWidth = containerRect.height;
            _marqueeWidth = marqueeRect.height;
        }

        if (autoFill && _containerWidth && _marqueeWidth) {
            multiplier.value =
                _marqueeWidth < _containerWidth ? Math.ceil(_containerWidth / _marqueeWidth) : 1;
        } else {
            multiplier.value = 1;
        }

        containerWidth.value = _containerWidth;
        marqueeWidth.value = _marqueeWidth;
    }
};

const multiplyChildren = (multiplier: number) => [
    ...Array(Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0),
];

watch([() => autoFill, () => direction, isMounted, containerRef], () => {
    if (isMounted.value) {
        calculateWidth();

        if (marqueeRef.value && containerRef.value) {
            if (resizeObserver.value) {
                resizeObserver.value.disconnect();
            }

            resizeObserver.value = new ResizeObserver(() => calculateWidth());
            resizeObserver.value.observe(containerRef.value);
            resizeObserver.value.observe(marqueeRef.value);
        }
    }
});

onMounted(() => {
    isMounted.value = true;
});
</script>

<style lang="scss">
.vfm-marquee-container {
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    position: relative;
    width: var(--width);
    transform: var(--transform);

    &:hover div {
        animation-play-state: var(--pause-on-hover);
    }

    &:active div {
        animation-play-state: var(--pause-on-click);
    }
}

.vfm-overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    @mixin gradient {
        background: linear-gradient(to right, var(--gradient-color), rgb(255, 255, 255, 0.1));
    }

    &::before,
    &::after {
        @include gradient;
        content: '';
        height: 100%;
        position: absolute;
        width: var(--gradient-width);
        z-index: 2;
        pointer-events: none;
        touch-action: none;
    }

    &::after {
        right: 0;
        top: 0;
        transform: rotateZ(180deg);
    }

    &::before {
        left: 0;
        top: 0;
    }
}

.vfm-marquee {
    flex: 0 0 auto;
    min-width: var(--min-width);
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
    animation-play-state: var(--play);
    animation-delay: var(--delay);
    animation-direction: var(--direction);

    @keyframes scroll {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
}

.vfm-parent {
    flex: 0 0 auto;
    display: flex;
    min-width: auto;
    flex-direction: row;
    align-items: center;

    & > * {
        transform: var(--transform);
    }
}
</style>
