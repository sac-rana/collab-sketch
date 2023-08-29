import { useState, useRef } from 'react';
import ColorPicker from './color-picker';
import ToolPicker from './tool-picker';

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ToolPicker />
      <canvas
        style={{ border: '1px solid black' }}
        width={600}
        height={420}
      ></canvas>
      <hr style={{ flexBasis: '100%', height: 0, border: 0 }} />
      <ColorPicker />
    </div>
  );
}
