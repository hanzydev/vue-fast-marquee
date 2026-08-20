export type PresetType = 'tech' | 'crypto' | 'testimonials' | 'features';

export interface MarqueeConfig {
    play: boolean;
    pauseOnHover: boolean;
    pauseOnClick: boolean;
    autoFill: boolean;
    draggable: boolean;
    direction: 'left' | 'right' | 'up' | 'down';
    speed: number;
    delay: number;
    loop: number;
    gradient: boolean;
    gradientColor: string;
    gradientColorDark?: string;
    gradientWidth: number;
}
