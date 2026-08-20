<template>
    <div
        ref="containerRef"
        :class="['vfm-marquee-container', { 'is-vertical': isVertical }]"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
    >
        <div v-if="gradient" class="vfm-overlay" />

        <div class="vfm-marquee" @animationiteration="emit('cycleComplete')" @animationend="emit('finish')">
            <div class="vfm-track" ref="marqueeRef">
                <slot />
            </div>
            <div v-for="i in Math.max(0, multiplier - 1)" class="vfm-track" :key="`track-a-${i}`">
                <slot />
            </div>
        </div>

        <div class="vfm-marquee" aria-hidden="true">
            <div v-for="i in multiplier" class="vfm-track" :key="`track-b-${i}`">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

export interface MarqueeProps {
    /**
     * @description Whether to automatically fill blank space in the marquee with copies of the children or not
     * @type {boolean}
     * @default false
     */
    autoFill?: boolean;
    /**
     * @description Whether to play or pause the marquee
     * @type {boolean}
     * @default true
     */
    play?: boolean;
    /**
     * @description Whether to pause the marquee when hovered
     * @type {boolean}
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * @description Whether to pause the marquee when clicked
     * @type {boolean}
     * @default false
     */
    pauseOnClick?: boolean;
    /**
     * @description The direction the marquee is sliding
     * @type {"left" | "right" | "up" | "down"}
     * @default "left"
     */
    direction?: 'left' | 'right' | 'up' | 'down';
    /**
     * @description Speed calculated as pixels/second
     * @type {number}
     * @default 50
     */
    speed?: number;
    /**
     * @description Duration to delay the animation after render, in seconds
     * @type {number}
     * @default 0
     */
    delay?: number;
    /**
     * @description The number of times the marquee should loop, 0 is equivalent to infinite
     * @type {number}
     * @default 0
     */
    loop?: number;
    /**
     * @description Whether to show the gradient or not
     * @type {boolean}
     * @default false
     */
    gradient?: boolean;
    /**
     * @description The color of the gradient
     * @type {string}
     * @default "white"
     */
    gradientColor?: string;
    /**
     * @description The color of the gradient in dark mode. Defaults to gradientColor if not specified
     * @type {string}
     * @default gradientColor
     */
    gradientColorDark?: string;
    /**
     * @description The width of the gradient on either side
     * @type {number | string}
     * @default 200
     */
    gradientWidth?: number | string;
    /**
     * @description Enable manual dragging to scrub through the marquee
     * @type {boolean}
     * @default false
     */
    draggable?: boolean;
}

const {
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
    gradientColorDark,
    gradientWidth = 200,
    draggable = false,
} = defineProps<MarqueeProps>();

const emit = defineEmits<{
    finish: [];
    cycleComplete: [];
}>();

const containerRef = ref<HTMLDivElement>();
const marqueeRef = ref<HTMLDivElement>();

const containerWidth = ref(0);
const marqueeWidth = ref(0);
const multiplier = ref(1);

const isPlayingState = ref(play);

watch(
    () => play,
    (val) => {
        isPlayingState.value = val;
    },
);

const isDragging = ref(false);

let startPos = 0;
let startAnimationTime = 0;
let activeAnimations: Animation[] = [];

const isVertical = computed(() => direction === 'up' || direction === 'down');

const duration = computed(() => {
    if (speed <= 0) return 0;
    if (autoFill) return (marqueeWidth.value * multiplier.value) / speed;

    return marqueeWidth.value < containerWidth.value ? containerWidth.value / speed : marqueeWidth.value / speed;
});

const cssVars = computed(() => {
    const ltrDirection = direction === 'left' || direction === 'up' ? 'normal' : 'reverse';
    const rtlDirection = ltrDirection === 'normal' ? 'reverse' : 'normal';
    const isPaused = !isPlayingState.value || isDragging.value;

    return {
        duration: `${duration.value}s`,
        delay: `${delay}s`,
        iteration: loop ? `${loop}` : 'infinite',
        direction: ltrDirection,
        directionRtl: rtlDirection,
        playState: isPaused ? 'paused' : 'running',
        minSize: autoFill ? 'auto' : '100%',
        pauseOnHover: isPaused || pauseOnHover ? 'paused' : 'running',
        pauseOnClick: isPaused || (pauseOnHover && !pauseOnClick) || pauseOnClick ? 'paused' : 'running',
        flexDirection: isVertical.value ? 'column' : 'row',
        maxHeight: isVertical.value ? '100%' : 'auto',
        gradientWidth: typeof gradientWidth === 'number' ? `${gradientWidth}px` : gradientWidth,
        gradientColor,
        gradientColorDark: gradientColorDark || gradientColor,
        cursor: draggable ? (isDragging.value ? 'grabbing' : 'grab') : 'auto',
        userSelect: draggable ? 'none' : 'auto',
        touchAction: draggable ? (isVertical.value ? 'pan-x' : 'pan-y') : 'auto',
    };
});

const getMarqueeAnimations = (): Animation[] => {
    if (!containerRef.value) return [];

    const elements = containerRef.value.querySelectorAll('.vfm-marquee');
    const anims: Animation[] = [];

    elements.forEach((el) => {
        el.getAnimations().forEach((a) => anims.push(a));
    });

    return anims;
};

const handlePointerDown = (e: PointerEvent) => {
    if (!draggable) return;

    isDragging.value = true;
    startPos = isVertical.value ? e.clientY : e.clientX;

    activeAnimations = getMarqueeAnimations();
    if (activeAnimations.length > 0) {
        const curr = activeAnimations[0].currentTime;
        startAnimationTime = typeof curr === 'number' ? curr : 0;
    }

    const currentTarget = e.currentTarget as HTMLElement;
    currentTarget?.setPointerCapture?.(e.pointerId);
};

const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.value || !draggable || activeAnimations.length === 0) return;

    const currentPos = isVertical.value ? e.clientY : e.clientX;
    const deltaPx = currentPos - startPos;

    const totalSize =
        (autoFill
            ? marqueeWidth.value * multiplier.value
            : marqueeWidth.value < containerWidth.value
              ? containerWidth.value
              : marqueeWidth.value) || 1;

    const durationMs = duration.value * 1000;
    if (durationMs <= 0) return;

    const isReverse = direction === 'right' || direction === 'down';
    const shiftMs = (deltaPx / totalSize) * durationMs * (isReverse ? 1 : -1);

    let newTime = (startAnimationTime + shiftMs) % durationMs;
    if (newTime < 0) newTime += durationMs;

    activeAnimations.forEach((a) => (a.currentTime = newTime));
};

const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging.value) return;
    isDragging.value = false;
    activeAnimations = [];

    const currentTarget = e.currentTarget as HTMLElement;
    currentTarget?.releasePointerCapture?.(e.pointerId);
};

const calculateSize = () => {
    if (marqueeRef.value && containerRef.value) {
        const containerRect = containerRef.value.getBoundingClientRect();
        const _containerSize = isVertical.value ? containerRect.height : containerRect.width;

        const marqueeRect = marqueeRef.value.getBoundingClientRect();
        const _marqueeSize = isVertical.value ? marqueeRect.height : marqueeRect.width;

        if (autoFill && _containerSize && _marqueeSize) {
            multiplier.value = _marqueeSize < _containerSize ? Math.ceil(_containerSize / _marqueeSize) : 1;
        } else {
            multiplier.value = 1;
        }

        containerWidth.value = _containerSize;
        marqueeWidth.value = _marqueeSize;
    }
};

const playAnimation = () => {
    isPlayingState.value = true;
};

const pauseAnimation = () => {
    isPlayingState.value = false;
};

const toggleAnimation = () => {
    isPlayingState.value = !isPlayingState.value;
};

const resetAnimation = () => {
    const anims = getMarqueeAnimations();

    anims.forEach((a) => (a.currentTime = 0));

    isPlayingState.value = true;
};

defineExpose({
    play: playAnimation,
    pause: pauseAnimation,
    toggle: toggleAnimation,
    reset: resetAnimation,
    isPlaying: computed(() => isPlayingState.value),
    isPaused: computed(() => !isPlayingState.value),
});

let resizeObserver: ResizeObserver | null = null;

const setupObserver = () => {
    if (marqueeRef.value && containerRef.value) {
        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(calculateSize);
        resizeObserver.observe(containerRef.value);
        resizeObserver.observe(marqueeRef.value);
    }
};

watch([() => autoFill, () => direction], () => nextTick(calculateSize));

watch(
    () => draggable,
    (value) => {
        if (!value && isDragging.value) {
            isDragging.value = false;
            activeAnimations = [];
        }
    },
);

onMounted(async () => {
    await nextTick();
    calculateSize();
    setupObserver();
});

onUnmounted(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
});
</script>

<style lang="scss" scoped>
.vfm-marquee-container {
    overflow: hidden;
    display: flex;
    flex-direction: v-bind('cssVars.flexDirection');
    position: relative;
    width: 100%;
    height: v-bind('cssVars.maxHeight');

    cursor: v-bind('cssVars.cursor');
    user-select: v-bind('cssVars.userSelect');
    touch-action: v-bind('cssVars.touchAction');

    &:hover .vfm-marquee {
        animation-play-state: v-bind('cssVars.pauseOnHover');
    }

    &:active .vfm-marquee {
        animation-play-state: v-bind('cssVars.pauseOnClick');
    }

    &:not(.is-vertical):dir(rtl),
    :global([dir='rtl']) &:not(.is-vertical) {
        .vfm-marquee {
            animation-direction: v-bind('cssVars.directionRtl');
        }
    }

    &.is-vertical {
        .vfm-marquee {
            animation-name: scroll-y;
        }

        .vfm-overlay {
            &::before {
                top: 0;
                left: 0;
                width: 100%;
                height: v-bind('cssVars.gradientWidth');
                background: linear-gradient(to bottom, var(--vfm-active-gradient), transparent);
            }

            &::after {
                top: auto;
                bottom: 0;
                left: 0;
                width: 100%;
                height: v-bind('cssVars.gradientWidth');
                background: linear-gradient(to top, var(--vfm-active-gradient), transparent);
            }
        }
    }
}

.vfm-marquee {
    flex: 0 0 auto;
    z-index: 1;
    display: flex;
    flex-direction: v-bind('cssVars.flexDirection');
    align-items: center;
    min-width: v-bind('cssVars.minSize');
    min-height: v-bind('cssVars.minSize');

    animation-name: scroll-x;
    animation-duration: v-bind('cssVars.duration');
    animation-timing-function: linear;
    animation-delay: v-bind('cssVars.delay');
    animation-iteration-count: v-bind('cssVars.iteration');
    animation-direction: v-bind('cssVars.direction');
    animation-play-state: v-bind('cssVars.playState');
}

@keyframes scroll-x {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
}

@keyframes scroll-y {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
    }
}

.vfm-overlay {
    --vfm-active-gradient: v-bind('cssVars.gradientColor');

    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;

    &::before,
    &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        touch-action: none;
    }

    &::before {
        left: 0;
        top: 0;
        height: 100%;
        width: v-bind('cssVars.gradientWidth');
        background: linear-gradient(to right, var(--vfm-active-gradient), transparent);
    }

    &::after {
        right: 0;
        top: 0;
        height: 100%;
        width: v-bind('cssVars.gradientWidth');
        background: linear-gradient(to left, var(--vfm-active-gradient), transparent);
    }
}

:global(.dark .vfm-overlay) {
    --vfm-active-gradient: v-bind('cssVars.gradientColorDark');
}

.vfm-track {
    flex: 0 0 auto;
    display: flex;
    flex-direction: v-bind('cssVars.flexDirection');
    align-items: center;
}
</style>
