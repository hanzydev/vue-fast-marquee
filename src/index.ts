import type { App, Plugin } from 'vue';
import Marquee, { type MarqueeProps } from './Marquee.vue';

export interface PluginOptions {
    name?: string;
}

export default {
    install(app: App, options?: PluginOptions) {
        app.component(options?.name ?? 'Marquee', Marquee);
    },
} as Plugin;

export { Marquee, type MarqueeProps };
