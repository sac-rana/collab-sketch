import { useEffect, useRef } from 'react';
import { tools } from '../utils/constants';

type Props = {
  selectedColor: string;
  selectedTool: string;
};

export default function DBCanvas({ selectedColor, selectedTool }: Props) {
  const isDrawing = useRef(false);
  const canvasLayer1Ctx = useRef<CanvasRenderingContext2D | null | undefined>(
    null,
  );
  const canvasLayer2Ctx = useRef<CanvasRenderingContext2D | null | undefined>(
    null,
  );

  const startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    canvasLayer1Ctx.current!.fillStyle = selectedColor;
    canvasLayer1Ctx.current!.strokeStyle = selectedColor;

    canvasLayer2Ctx.current!.fillStyle = selectedColor;
    canvasLayer2Ctx.current!.strokeStyle = selectedColor;

    canvasLayer1Ctx.current!.lineWidth = 2;
    canvasLayer2Ctx.current!.lineWidth = 2;

    if (selectedTool == 'erasure') {
      canvasLayer1Ctx.current!.fillStyle = 'white';
      canvasLayer1Ctx.current!.strokeStyle = 'white';
      canvasLayer1Ctx.current!.lineWidth = 16;
    }
  }, [selectedTool, selectedColor]);
  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvas => (canvasLayer1Ctx.current = canvas?.getContext('2d'))}
        style={{
          border: '1px solid black',
          cursor: `url(${
            tools.find(t => t.name == selectedTool)?.icon.url.split('.')[0]
          }_cursor.png) 0 28, auto`,
        }}
        width={640}
        height={420}
        onMouseDown={e => {
          isDrawing.current = true;
          if (selectedTool == 'pencil' || selectedTool == 'erasure') {
            canvasLayer1Ctx.current!.beginPath();
            canvasLayer1Ctx.current!.lineTo(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
            );
          }
        }}
        onMouseMove={e => {
          if (!isDrawing.current) return;
          if (selectedTool == 'pencil' || selectedTool == 'erasure') {
            canvasLayer1Ctx.current?.lineTo(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
            );
            canvasLayer1Ctx.current?.stroke();
          }
        }}
        onMouseUp={e => {
          isDrawing.current = false;
        }}
        onClick={e => {
          if (selectedTool == 'pencil' || selectedTool == 'erasure') {
            canvasLayer1Ctx.current!.beginPath();
            canvasLayer1Ctx.current!.arc(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
              2,
              0,
              7,
            );
            canvasLayer1Ctx.current!.fill();
          } else if (selectedTool == 'bucket') {
            const imgData = canvasLayer1Ctx.current!.getImageData(
              0,
              0,
              640,
              420,
            );
            let x = e.nativeEvent.offsetX,
              y = e.nativeEvent.offsetY;
            let index = (y * imgData.width + x) * 4;
            let targetColor =
              imgData.data[index + 3] == 0
                ? 'rgb(255, 255, 255)'
                : `rgb(${imgData.data[index]}, ${imgData.data[index + 1]}, ${
                    imgData.data[index + 2]
                  })`;
            let fillColor = canvasLayer1Ctx.current!.fillStyle.toString();
            let r = parseInt(fillColor.slice(1, 3), 16),
              g = parseInt(fillColor.slice(3, 5), 16),
              b = parseInt(fillColor.slice(5, 7), 16);

            if (targetColor == `rgb(${r}, ${g}, ${b})`) return;
            floodFill(x, y, targetColor, { r, g, b }, imgData);
            canvasLayer1Ctx.current!.putImageData(imgData, 0, 0);
          }
        }}
        onMouseLeave={e => {
          isDrawing.current = false;
        }}
      ></canvas>

      <canvas
        ref={canvas => (canvasLayer2Ctx.current = canvas?.getContext('2d'))}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: selectedTool == 'line' ? 'auto' : 'none',
          border: '1px solid black',
          cursor:
            selectedTool == 'line' ? `url(line_cursor.png) 0 28, auto` : 'auto',
          zIndex: 5,
        }}
        width={640}
        height={420}
        onMouseDown={e => {
          isDrawing.current = true;
          startPoint.current.x = e.nativeEvent.offsetX;
          startPoint.current.y = e.nativeEvent.offsetY;
        }}
        onMouseMove={e => {
          if (!isDrawing.current) return;
          canvasLayer2Ctx.current!.clearRect(0, 0, 640, 420);
          canvasLayer2Ctx.current!.beginPath();
          canvasLayer2Ctx.current!.moveTo(
            startPoint.current.x,
            startPoint.current.y,
          );
          canvasLayer2Ctx.current!.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
          );
          canvasLayer2Ctx.current!.stroke();
        }}
        onMouseUp={e => {
          if (!isDrawing.current) return;
          isDrawing.current = false;
          canvasLayer1Ctx.current!.drawImage(
            canvasLayer2Ctx.current!.canvas,
            0,
            0,
          );
          canvasLayer2Ctx.current!.clearRect(0, 0, 640, 420);
        }}
      ></canvas>
    </div>
  );
}

const floodFill = (
  x: number,
  y: number,
  targetColor: string,
  fillColor: { r: number; g: number; b: number },
  imgData: ImageData,
) => {
  const stack = [{ x, y }];
  while (stack.length != 0) {
    const { x, y } = stack.pop()!;
    if (x < 0 || x >= imgData.width || y < 0 || y >= imgData.height) continue;
    let index = (y * imgData.width + x) * 4;
    let currColor =
      imgData.data[index + 3] == 0
        ? 'rgb(255, 255, 255)'
        : `rgb(${imgData.data[index]}, ${imgData.data[index + 1]}, ${
            imgData.data[index + 2]
          })`;
    if (currColor != targetColor) continue;
    imgData.data[index] = fillColor.r;
    imgData.data[index + 1] = fillColor.g;
    imgData.data[index + 2] = fillColor.b;
    imgData.data[index + 3] = 255;

    stack.push({ x: x + 1, y });
    stack.push({ x: x - 1, y });
    stack.push({ x, y: y + 1 });
    stack.push({ x, y: y - 1 });
  }
};
