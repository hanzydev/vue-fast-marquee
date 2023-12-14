# Vue Fast Marquee

A lightweight Vue 3 component that harnesses the power of CSS animations to create silky smooth marquees. (Inspired by [react-fast-marquee](https://npmjs.org/package/react-fast-marquee))

![vue-fast-marquee](https://media.giphy.com/media/6ritiN2cpvpsyz4fo6/giphy.gif)

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

| Property          | Type                                | Default           | Description                                                                                                                                                                                          |
| :---------------- | :---------------------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style`         | `CSSProperties`                     | `{}`     | Inline style for the container div                                                                                                                                                                   |
| `className`     | `string`                            | `""`     | Name of the css class to style the container div                                                                                                                                                     |
| `autoFill`      | `boolean`                           | `false`  | Whether to automatically fill blank space in the marquee with copies of the children or not                                                                                                          |
| `play`          | `boolean`                           | `true`   | Whether to play or pause the marquee                                                                                                                                                                 |
| `pauseOnHover`  | `boolean`                           | `false`  | Whether to pause the marquee when hovered                                                                                                                                                            |
| `pauseOnClick`  | `boolean`                           | `false`  | Whether to pause the marquee when clicked                                                                                                                                                            |
| `direction`     | `"left" \| "right"\| "up"\| "down"` | `"left"` | The direction the marquee slides <br /><br /> **Warning:** Vertical marquees are currently experimental and may be buggy. Please swap the values of the marquee's height and width when setting them |
| `speed`         | `number`                            | `50`     | Speed calculated as pixels/second                                                                                                                                                                    |
| `delay`         | `number`                            | `0`      | Duration to delay the animation after render, in seconds                                                                                                                                             |
| `loop`          | `number`                            | `0`      | The number of times the marquee should loop, 0 is equivalent to infinite                                                                                                                             |
| `gradient`      | `boolean`                           | `false`  | Whether to show the gradient or not                                                                                                                                                                  |
| `gradientColor` | `string`                            | `white`  | The color of the gradient                                                                                                                                                                            |
| `gradientWidth` | `number \| string`                  | `200`    | The width of the gradient on either side                                                                                                                                                             |     |

## Events

| Event Name      | Description                                                                                                  |
| :-------------- | :----------------------------------------------------------------------------------------------------------- |
| `finish`        | Emitted when the marquee finishes scrolling and stops. Only calls if loop is non-zero.                       |
| `cycleComplete` | Emitted when the marquee finishes a loop. Does not call if maximum loops are reached (use onFinish instead). |
