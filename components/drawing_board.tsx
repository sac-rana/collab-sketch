import { useState } from 'react';
import ColorPicker from './color-picker';

export default function DrawingBoard() {
  const [primaryColor, setPrimaryColor] = useState('black');
  return (
    <div>
      <ColorPicker
        selectedColor={primaryColor}
        onColorSelect={color => setPrimaryColor(color)}
      />
    </div>
  );
}
