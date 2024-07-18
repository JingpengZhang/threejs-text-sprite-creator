export type CreateTextCanvasElementOptions = {
  color?: string; // 文字颜色
  backgroundColor?: string | false; // 背景色（为 false 时不设置背景色）
  padding?: number | [number, number]; // 内边距
  borderWidth?: number | [number, number]; // 边框宽度
  borderRadius?: number | [number, number, number, number]; // 边框圆角大小
  borderColor?: string; // 边框颜色
  strokeWidth?: number; // 文字描边宽度
  strokeColor?: string; // 文字描边颜色
  fontFace?: string; // 字体
  fontSize?: number; // 文字大小
  fontWeight?: string; // 字重
  offsetX?: number; // 文字 X 轴偏移
  offsetY?: number; // 文字 Y 轴偏移（为了解决文字相对背景没有垂直居中的问题）
  lineSpacing?: number; // 行间距
};

const CreateTextCanvasElement = (text: string, options?: CreateTextCanvasElementOptions) => {
  // 参数
  const color = options?.color ?? 'rgba(255,255,255,1)';
  const backgroundColor = options?.backgroundColor ?? false;

  const padding = options?.padding ?? 0;
  const borderWidth = options?.borderWidth ?? 0;
  const borderRadius = options?.borderRadius ?? 0;
  const borderColor = options?.borderColor ?? 'white';

  const strokeWidth = options?.strokeWidth ?? 0;
  const strokeColor = options?.strokeColor ?? 'white';

  const fontFace = options?.fontFace ?? '微软雅黑';
  const fontSize = options?.fontSize ?? 90;
  const fontWeight = options?.fontWeight ?? 'normal';

  const offsetX = options?.offsetX ?? 0;
  const offsetY = options?.offsetY ?? 0;

  const lineSpacing = options?.lineSpacing ?? 0;

  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');

  // 边框大小
  const _border = Array.isArray(borderWidth) ? borderWidth : (Array(2) as [number, number]).fill(borderWidth);
  const relBorder = _border.map((b) => b * fontSize * 0.1) as [number, number];

  // 边角大小
  const _borderRadius = Array.isArray(borderRadius)
    ? borderRadius
    : (Array(4) as [number, number, number, number]).fill(borderRadius);
  const relBorderRadius = _borderRadius.map((b) => b * fontSize * 0.1);

  const _padding = Array.isArray(padding) ? padding : (Array(2) as [number, number]).fill(padding);
  const relPadding = _padding.map((p) => p * fontSize * 0.1) as [number, number];

  const lines = text.split('\n');
  const font = `${fontWeight} ${fontSize}px ${fontFace}`;

  if (ctx) {
    ctx.font = font;

    const innerWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
    const innerHeight = fontSize * lines.length;
    canvas.width = innerWidth + relBorder[0] * 2 + relPadding[0] * 2;
    canvas.height = innerHeight + relBorder[1] * 2 + relPadding[1] * 2 + (lines.length - 1) * lineSpacing;

    // border
    if (borderWidth) {
      ctx.strokeStyle = borderColor;
      if (relBorder[0]) {
        const hb = relBorder[0] / 2;
        ctx.lineWidth = relBorder[0];
        ctx.beginPath();
        ctx.moveTo(hb, relBorderRadius[0]);
        ctx.lineTo(hb, canvas.height - relBorderRadius[3]);
        ctx.moveTo(canvas.width - hb, relBorderRadius[1]);
        ctx.lineTo(canvas.width - hb, canvas.height - relBorderRadius[2]);
        ctx.stroke();
      }

      if (relBorder[1]) {
        // top + bottom borders
        const hb = relBorder[1] / 2;
        ctx.lineWidth = relBorder[1];
        ctx.beginPath();
        ctx.moveTo(Math.max(relBorder[0], relBorderRadius[0]), hb);
        ctx.lineTo(canvas.width - Math.max(relBorder[0], relBorderRadius[1]), hb);
        ctx.moveTo(Math.max(relBorder[0], relBorderRadius[3]), canvas.height - hb);
        ctx.lineTo(canvas.width - Math.max(relBorder[0], relBorderRadius[2]), canvas.height - hb);
        ctx.stroke();
      }

      if (borderRadius) {
        // strike rounded corners
        const cornerWidth = Math.max(...relBorder);
        const hb = cornerWidth / 2;
        ctx.lineWidth = cornerWidth;
        ctx.beginPath();
        const radiusArr = [
          !!relBorderRadius[0] && [relBorderRadius[0], hb, hb, relBorderRadius[0]],
          !!relBorderRadius[1] && [canvas.width - relBorderRadius[1], canvas.width - hb, hb, relBorderRadius[1]],
          !!relBorderRadius[2] && [
            canvas.width - relBorderRadius[2],
            canvas.width - hb,
            canvas.height - hb,
            canvas.height - relBorderRadius[2],
          ],
          !!relBorderRadius[3] && [relBorderRadius[3], hb, canvas.height - hb, canvas.height - relBorderRadius[3]],
        ].filter((d) => d);
        (radiusArr as [number, number, number, number][]).forEach(([x0, x1, y0, y1]) => {
          ctx.moveTo(x0, y0);
          ctx.quadraticCurveTo(x1, y0, x1, y1);
        });
        ctx.stroke();
      }
    }
    // paint background
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      if (!borderRadius) {
        ctx.fillRect(relBorder[0], relBorder[1], canvas.width - relBorder[0] * 2, canvas.height - relBorder[1] * 2);
      } else {
        // fill with rounded corners
        ctx.beginPath();
        ctx.moveTo(relBorder[0], relBorderRadius[0]);
        [
          [
            relBorder[0],
            relBorderRadius[0],
            canvas.width - relBorderRadius[1],
            relBorder[1],
            relBorder[1],
            relBorder[1],
          ], // t
          [
            canvas.width - relBorder[0],
            canvas.width - relBorder[0],
            canvas.width - relBorder[0],
            relBorder[1],
            relBorderRadius[1],
            canvas.height - relBorderRadius[2],
          ], // r
          [
            canvas.width - relBorder[0],
            canvas.width - relBorderRadius[2],
            relBorderRadius[3],
            canvas.height - relBorder[1],
            canvas.height - relBorder[1],
            canvas.height - relBorder[1],
          ], // b
          [
            relBorder[0],
            relBorder[0],
            relBorder[0],
            canvas.height - relBorder[1],
            canvas.height - relBorderRadius[3],
            relBorderRadius[0],
          ], // t
        ].forEach(([x0, x1, x2, y0, y1, y2]) => {
          ctx.quadraticCurveTo(x0, y0, x1, y1);
          ctx.lineTo(x2, y2);
        });
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.translate(...relBorder);
    ctx.translate(...relPadding);

    // paint text
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = 'bottom';

    const drawTextStroke = strokeWidth! > 0;
    if (drawTextStroke) {
      ctx.lineWidth = (strokeWidth * fontSize) / 10;
      ctx.strokeStyle = strokeColor;
    }

    lines.forEach((line, index) => {
      const lineX = (innerWidth - ctx.measureText(line).width) / 2 + offsetX;
      const lineY = (index + 1) * fontSize + offsetY + index * lineSpacing;

      if (drawTextStroke) ctx.strokeText(line, lineX, lineY);
      ctx.fillText(line, lineX, lineY);
    });
  }

  return canvas;
};

export default CreateTextCanvasElement;
