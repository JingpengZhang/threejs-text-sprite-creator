# threejs-text-sprite-creator

**Read this in other languages: [English](README_en.md), [中文](README.md).**

Create a text sprite in threejs, which inherits from the Threejs.Sprite class and supports settings such as rounded corners, font size, background color, and font color.

The project is based on the [three-spritetext](https://github.com/vasturiano/three-spritetext) project of [@vasturiano](https://github.com/vasturiano), and some new features have been added to the original basis.

## Install

```bash
npm i threejs-text-sprite-creator
// or
pnpm i threejs-text-sprite-creator
```

## Demo

```ts
import { CreateTextCanvasElement, TextSprite } from 'threejs-text-sprite-creator';

// create text-sprite-1
const text1 = new TextSprite('first line\ntest\nsecond line', {
  fontSize: 100,
  textHeight: 10,
  padding: 3,
  backgroundColor: 'rgba(255,0,0,0.4)',
  borderRadius: [3, 0, 3, 0],
  borderWidth: 0.1,
  offsetY: 10,
  strokeColor: 'green',
  strokeWidth: 1,
});
text1.scaleFactor = 0.01;
text1.lineSpacing = 30;
scene.add(text1);

// create text-sprite-2 ，and copy the style of text-sprite-1
const text2 = new TextSprite('test copy', { color: 'yellow' });
text2.copy(text1);
text2.position.set(4, 0, 0);
scene.add(text2);
```

## API reference

### Constructor

<b>TextSprite</b> ([<i>text</i>,<i>options</i>])

### Properties

| Property    | Description                                                                                                                                                                | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| scaleFactor | Factor controlling scaling.                                                                                                                                                | 1       |
| offsetX     | The horizontal offset of the text                                                                                                                                          | 0       |
| offsetY     | The vertical offset of the text. (Mainly used to solve the problem of Chinese characters not being centered on the canvas. Maybe other languages ​​also have this problem) | 0       |
| lineSpacing | Just like it\`s name.                                                                                                                                                      | 0       |

For other attributes, please refer to the original author’s project description.： [three-spritetext](https://github.com/vasturiano/three-spritetext)
