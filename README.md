# threejs-text-sprite-creator

**其他语言版本: [中文](README.md),[English](README_en.md) .**

在 threejs 中创建一个文字精灵，继承自 Threejs.Sprite 类，支持圆角、字体大小、背景颜色、字体颜色等设置。

项目基于 [@vasturiano](https://github.com/vasturiano) 大佬的 [three-spritetext](https://github.com/vasturiano/three-spritetext) 项目改造，在原基础上增加了一些新的功能。

## 安装

```bash
npm i threejs-text-sprite-creator
// or
pnpm i threejs-text-sprite-creator
```

## 使用示例

```ts
import { CreateTextCanvasElement, TextSprite } from 'threejs-text-sprite-creator';

// 添加文字精灵 1
const text1 = new TextSprite('第一行文本\n测试\n第三行', {
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

// 添加文字精灵 2 ，样式复制文字精灵 1 的
const text2 = new TextSprite('复制', { color: 'yellow' });
text2.copy(text1);
text2.position.set(4, 0, 0);
scene.add(text2);
```

## API

### 构造函数

<b>TextSprite</b> ([<i>text</i>,<i>options</i>])

### 属性

| 属性名      | 描述                                                                                         | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------- | ------ |
| scaleFactor | 缩放系数，用于缩放文字精灵。                                                                 | 1      |
| offsetX     | 水平方向上的偏移量。                                                                         | 0      |
| offsetY     | 垂直方向上的偏移量。（主要用来解决中文在画布上不垂直居中的问题，或许其他语言也会有这个问题） | 0      |
| lineSpacing | 行间距。                                                                                     | 0      |

其他属性请参考原作者的项目说明： [three-spritetext](https://github.com/vasturiano/three-spritetext)
