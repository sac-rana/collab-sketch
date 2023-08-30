import { useState } from 'react';
import ColorPicker from './color-picker';
import ToolPicker from './tool-picker';
import DBCanvas from './db-canvas';

export default function DrawingBoard() {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ToolPicker
        selectedTool={selectedTool}
        onToolSelect={tool => setSelectedTool(tool)}
      />
      <DBCanvas selectedColor={selectedColor} selectedTool={selectedTool} />
      <hr style={{ flexBasis: '100%', height: 0, border: 0 }} />
      <ColorPicker
        selectedColor={selectedColor}
        onColorSelect={color => setSelectedColor(color)}
      />
    </div>
  );
}
