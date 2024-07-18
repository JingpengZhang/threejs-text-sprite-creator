import { LinearFilter, Sprite, SpriteMaterial, Texture } from 'three';
import CreateTextCanvasElement, { CreateTextCanvasElementOptions } from './lib/CreateTextCanvasElement';

class SpriteText extends Sprite {
  // 文本
  private _text: string;

  // 缩放系数
  private _scaleFactor: number;

  private _textHeight: number;

  // 文字设置
  private _color: string;
  private _backgroundColor: string | false;
  private _padding: number | [number, number];
  private _borderWidth: number | [number, number];
  private _borderRadius: number | [number, number, number, number];
  private _borderColor: string;
  private _strokeWidth: number;
  private _strokeColor: string;
  private _fontFace: string;
  private _fontSize: number;
  private _fontWeight: string;
  private _offsetX: CreateTextCanvasElementOptions['offsetX'];
  private _offsetY: CreateTextCanvasElementOptions['offsetY'];
  private _lineSpacing: CreateTextCanvasElementOptions['lineSpacing'];

  constructor(
    text: string,
    options?: {
      scaleFactor?: number;
      textHeight?: number;
    } & CreateTextCanvasElementOptions,
  ) {
    super(new SpriteMaterial());

    this._text = text;
    this._textHeight = options?.textHeight ?? 10;

    this._scaleFactor = options?.scaleFactor ?? 1;

    this._color = options?.color ?? 'rgba(255,255,255,1)';
    this._backgroundColor = options?.backgroundColor ?? false;

    this._padding = options?.padding ?? 0;
    this._borderWidth = options?.borderWidth ?? 0;
    this._borderRadius = options?.borderRadius ?? 0;
    this._borderColor = options?.borderColor ?? 'white';

    this._strokeWidth = options?.strokeWidth ?? 0;
    this._strokeColor = options?.strokeColor ?? 'white';

    this._fontFace = options?.fontFace ?? '微软雅黑';
    this._fontSize = options?.fontSize ?? 90;
    this._fontWeight = options?.fontWeight ?? 'normal';

    this._offsetX = options?.offsetX ?? 0;
    this._offsetY = options?.offsetY ?? 0;

    this._lineSpacing = options?.lineSpacing ?? 0;

    this._genCanvas();
  }

  get scaleFactor() {
    return this._scaleFactor;
  }
  set scaleFactor(scaleFactor: typeof this._scaleFactor) {
    this._scaleFactor = scaleFactor;
    this._genCanvas();
  }
  get text() {
    return this._text;
  }
  set text(text: typeof this._text) {
    this._text = text;
    this._genCanvas();
  }
  get textHeight() {
    return this._textHeight;
  }
  set textHeight(textHeight: typeof this._textHeight) {
    this._textHeight = textHeight;
    this._genCanvas();
  }
  get color() {
    return this._color;
  }
  set color(color: typeof this._color) {
    this._color = color;
    this._genCanvas();
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(backgroundColor: typeof this._backgroundColor) {
    this._backgroundColor = backgroundColor;
    this._genCanvas();
  }
  get padding() {
    return this._padding;
  }
  set padding(padding: typeof this._padding) {
    this._padding = padding;
    this._genCanvas();
  }
  get borderWidth() {
    return this._borderWidth;
  }
  set borderWidth(borderWidth: typeof this._borderWidth) {
    this._borderWidth = borderWidth;
    this._genCanvas();
  }
  get borderRadius() {
    return this._borderRadius;
  }
  set borderRadius(borderRadius: typeof this._borderRadius) {
    this._borderRadius = borderRadius;
    this._genCanvas();
  }
  get borderColor() {
    return this._borderColor;
  }
  set borderColor(borderColor: typeof this._borderColor) {
    this._borderColor = borderColor;
    this._genCanvas();
  }
  get fontFace() {
    return this._fontFace;
  }
  set fontFace(fontFace: typeof this._fontFace) {
    this._fontFace = fontFace;
    this._genCanvas();
  }
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(fontSize: typeof this._fontSize) {
    this._fontSize = fontSize;
    this._genCanvas();
  }
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(fontWeight: typeof this._fontWeight) {
    this._fontWeight = fontWeight;
    this._genCanvas();
  }
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(strokeWidth: typeof this._strokeWidth) {
    this._strokeWidth = strokeWidth;
    this._genCanvas();
  }
  get strokeColor() {
    return this._strokeColor;
  }
  set strokeColor(strokeColor: typeof this._strokeColor) {
    this._strokeColor = strokeColor;
    this._genCanvas();
  }
  get offsetX() {
    return this._offsetX;
  }
  set offsetX(offsetX: typeof this._offsetX) {
    this._offsetX = offsetX;
    this._genCanvas();
  }
  get offsetY() {
    return this._offsetY;
  }
  set offsetY(offsetY: typeof this._offsetY) {
    this._offsetY = offsetY;
    this._genCanvas();
  }
  get lineSpacing() {
    return this._lineSpacing;
  }
  set lineSpacing(lineSpacing: typeof this._lineSpacing) {
    this._lineSpacing = lineSpacing;
    this._genCanvas();
  }

  private _genCanvas() {
    const canvas = CreateTextCanvasElement(this.text, {
      color: this.color,
      backgroundColor: this.backgroundColor,
      padding: this.padding,
      borderWidth: this.borderWidth,
      borderRadius: this.borderRadius,
      borderColor: this.borderColor,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor,
      fontFace: this.fontFace,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      lineSpacing: this.lineSpacing,
    });
    if (this.material.map) this.material.map.dispose();
    const texture = (this.material.map = new Texture(canvas));
    texture.minFilter = LinearFilter;
    texture.needsUpdate = true;

    const lines = this.text.split('\n');

    const yScale =
      this.textHeight * lines.length +
      (Array.isArray(this.borderWidth) ? this.borderWidth[1] : this.borderWidth) * 2 +
      (Array.isArray(this.padding) ? this.padding[1] : this.padding) * 2;

    this.scale.set(((yScale * canvas.width) / canvas.height) * this.scaleFactor, yScale * this.scaleFactor, 0);
  }

  copy(source: this): this {
    this.color = source.color;
    this.backgroundColor = source.backgroundColor;
    this.padding = source.padding;
    this.borderWidth = source.borderWidth;
    this.borderColor = source.borderColor;
    this.borderRadius = source.borderRadius;
    this.fontFace = source.fontFace;
    this.fontSize = source.fontSize;
    this.fontWeight = source.fontWeight;
    this.strokeWidth = source.strokeWidth;
    this.strokeColor = source.strokeColor;
    this.offsetX = source.offsetX;
    this.offsetY = source.offsetY;
    this.lineSpacing = source.lineSpacing;

    this.textHeight = source.textHeight;
    this.scaleFactor = source.scaleFactor;

    return this;
  }
}

export default SpriteText;
