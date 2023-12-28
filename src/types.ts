import type { CSSProperties } from 'vue';

export interface MarqueeProps {
    /**
     * @description Inline style for the container div
     * @type {CSSProperties}
     * @default {}
     */
    style?: CSSProperties;
    /**
     * @description Class name to style the container div
     * @type {any}
     * @default ""
     */
    class?: any;
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
     * @description The width of the gradient on either side
     * @type {number | string}
     * @default 200
     */
    gradientWidth?: number | string;
}
