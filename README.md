# Vue Fast Marquee

A lightweight Vue 3 component that harnesses the power of CSS animations to create silky smooth marquees.

[🎮 **Interactive Playground / Demo**](https://hanzydev.github.io/vue-fast-marquee/)

> 📌 **Upgrading to v2.0.0**: Vertical marquees now use native CSS column layouts (no manual width/height swapping needed). This release also adds interactive drag scrubbing (`draggable`) and dark mode gradient support (`gradientColorDark`).


## 🚀 What's New in v2.0.0

- 🖱️ **Drag-to-Scrub**: Set `draggable` to allow users to drag or swipe to scrub through marquee content.
- 🌙 **Dark Mode Gradient**: Added `gradientColorDark` for dark mode gradient masks (supports `.dark` class and `prefers-color-scheme`).
- 📐 **Native Vertical Marquee**: Vertical directions (`up` / `down`) now render natively with CSS flex column layout and vertical gradients.
- ⚡ **Smooth Playback**: Improved hover and click pause handling to work seamlessly alongside drag scrubbing.

## Installation

```sh
# if you're using npm
npm i vue-fast-marquee

# if you're using yarn
yarn add vue-fast-marquee

# if you're using pnpm
pnpm i vue-fast-marquee
```

## Usage

The most common use case is to register the component globally.

```js
// main.js or similar
import "vue-fast-marquee/style.css"; // import the styles

import { createApp } from 'vue';
import Marquee from 'vue-fast-marquee';

createApp(App).use(Marquee).mount('#app');
```

Alternatively you can also import the component locally.

```html
<script setup>
import { Marquee } from 'vue-fast-marquee';
</script>
```

You can then use the component in your template.

```html
<script setup>
import { Marquee } from 'vue-fast-marquee';
import MyComponent from '../components/MyComponent.vue';
</script>

<template>
    <Marquee>
        <MyComponent />
        <MyComponent />
        <MyComponent />
    </Marquee>
</template>
```

## Props

| Property            | Type                                | Default   | Description                                                                                 |
| :------------------ | :---------------------------------- | :-------- | :------------------------------------------------------------------------------------------ |
| `autoFill`          | `boolean`                           | `false`   | Whether to automatically fill blank space in the marquee with copies of the children or not |
| `play`              | `boolean`                           | `true`    | Whether to play or pause the marquee                                                        |
| `pauseOnHover`      | `boolean`                           | `false`   | Whether to pause the marquee when hovered                                                   |
| `pauseOnClick`      | `boolean`                           | `false`   | Whether to pause the marquee when clicked                                                   |
| `direction`         | `"left" \| "right" \| "up" \| "down"` | `"left"`  | The direction the marquee is sliding                                                        |
| `speed`             | `number`                            | `50`      | Speed calculated as pixels/second                                                           |
| `delay`             | `number`                            | `0`       | Duration to delay the animation after render, in seconds                                    |
| `loop`              | `number`                            | `0`       | The number of times the marquee should loop, 0 is equivalent to infinite                    |
| `gradient`          | `boolean`                           | `false`   | Whether to show the gradient mask on the edges or not                                       |
| `gradientColor`     | `string`                            | `"white"` | The color of the gradient mask                                                              |
| `gradientColorDark` | `string`                            | `gradientColor` | The color of the gradient mask in dark mode (`.dark` class or `prefers-color-scheme: dark`). Defaults to `gradientColor` if not set |
| `gradientWidth`     | `number \| string`                  | `200`     | The width/height of the gradient on either side (in pixels or CSS unit string)              |
| `draggable`         | `boolean`                           | `false`   | Enable manual dragging/swiping with pointer/touch to scrub through the marquee              |

## Events

| Event Name      | Description                                                                                                  |
| :-------------- | :----------------------------------------------------------------------------------------------------------- |
| `finish`        | Emitted when the marquee finishes scrolling and stops. Only calls if loop is non-zero.                       |
| `cycleComplete` | Emitted when the marquee finishes a loop. Does not call if maximum loops are reached (use onFinish instead). |
