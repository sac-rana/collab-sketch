import { useEffect, useRef } from 'react';
import { shapes, tools } from '@/lib/constants';
import { firestore } from '@/lib/utils';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

type Props = {
  selectedColor: string;
  selectedTool: string;
  docId: string;
};

export default function DBCanvas({
  selectedColor,
  selectedTool,
  docId,
}: Props) {
  const isDrawing = useRef(false);
  const canvasLayer1Ctx = useRef<CanvasRenderingContext2D | null | undefined>(
    null,
  );
  const canvasLayer2Ctx = useRef<CanvasRenderingContext2D | null | undefined>(
    null,
  );

  const myId = useRef<string | null>(null);
  const hasChanged = useRef(false);

  const startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    canvasLayer1Ctx.current!.fillStyle = selectedColor;
    canvasLayer1Ctx.current!.strokeStyle = selectedColor;

    canvasLayer2Ctx.current!.fillStyle = selectedColor;
    canvasLayer2Ctx.current!.strokeStyle = selectedColor;

    canvasLayer1Ctx.current!.lineWidth = 2;
    canvasLayer2Ctx.current!.lineWidth = 2;
    if (selectedTool == 'eraser') {
      canvasLayer1Ctx.current!.fillStyle = 'white';
      canvasLayer1Ctx.current!.strokeStyle = 'white';
      canvasLayer1Ctx.current!.lineWidth = 16;
    }
  }, [selectedTool, selectedColor]);

  useEffect(() => {
    myId.current = crypto.randomUUID();
    const unsub = onSnapshot(doc(firestore, 'sketch', docId), doc => {
      const data = doc.data();
      if (data && data.userId != myId.current) {
        const img = new Image();
        img.src = data.imgDataUrl;
        img.onload = () => {
          canvasLayer1Ctx.current!.drawImage(img, 0, 0);
        };
      }
    });
    const intervalId = setInterval(() => {
      if (!hasChanged.current) return;
      hasChanged.current = false;
      const data = canvasLayer1Ctx.current!.canvas.toDataURL();
      setDoc(
        doc(firestore, 'sketch', docId),
        { userId: myId.current, imgDataUrl: data },
        { merge: true },
      );
    }, 1000);
    return () => {
      clearInterval(intervalId);
      unsub();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvas => (canvasLayer1Ctx.current = canvas?.getContext('2d'))}
        style={{
          border: '1px solid black',
          cursor: tools.has(selectedTool)
            ? `url(/${tools.get(selectedTool)?.cursor}) 0 28, auto`
            : 'auto',
        }}
        width={640}
        height={420}
        onMouseDown={e => {
          isDrawing.current = true;
          if (selectedTool == 'pencil' || selectedTool == 'eraser') {
            canvasLayer1Ctx.current!.beginPath();
            canvasLayer1Ctx.current!.lineTo(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
            );
          }
          hasChanged.current = true;
        }}
        onMouseMove={e => {
          if (!isDrawing.current) return;
          if (selectedTool == 'pencil' || selectedTool == 'eraser') {
            canvasLayer1Ctx.current?.lineTo(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
            );
            canvasLayer1Ctx.current?.stroke();
          }
          hasChanged.current = true;
        }}
        onMouseUp={e => {
          isDrawing.current = false;
        }}
        onClick={e => {
          if (selectedTool == 'pencil' || selectedTool == 'eraser') {
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
          hasChanged.current = true;
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
          pointerEvents: shapes.has(selectedTool) ? 'auto' : 'none',
          border: '1px solid black',
          cursor: 'crosshair',
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
          if (selectedTool == 'line') {
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
          } else if (selectedTool == 'rect') {
            canvasLayer2Ctx.current!.strokeRect(
              startPoint.current.x,
              startPoint.current.y,
              e.nativeEvent.offsetX - startPoint.current.x,
              e.nativeEvent.offsetY - startPoint.current.y,
            );
          } else if (selectedTool == 'circle') {
            canvasLayer2Ctx.current!.beginPath();
            canvasLayer2Ctx.current!.moveTo(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
            );
            canvasLayer2Ctx.current!.lineTo(
              startPoint.current.x,
              startPoint.current.y,
            );
            canvasLayer2Ctx.current!.stroke();
            canvasLayer2Ctx.current!.beginPath();
            canvasLayer2Ctx.current!.arc(
              startPoint.current.x,
              startPoint.current.y,
              Math.floor(
                Math.sqrt(
                  (e.nativeEvent.offsetX - startPoint.current.x) ** 2 +
                    (e.nativeEvent.offsetY - startPoint.current.y) ** 2,
                ),
              ),
              0,
              7,
            );
            canvasLayer2Ctx.current!.stroke();
          }
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
          hasChanged.current = true;
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
