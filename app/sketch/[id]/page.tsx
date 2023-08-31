'use client';
import styles from './page.module.css';

import { useState } from 'react';
import ColorPicker from '../../../components/color-picker';
import ToolPicker from '../../../components/tool-picker';
import DBCanvas from '../../../components/db-canvas';

export default function Home({ params }: { params: { id: string } }) {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('black');
  return (
    <main className={styles.main}>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <ToolPicker
          selectedTool={selectedTool}
          onToolSelect={tool => setSelectedTool(tool)}
        />
        <DBCanvas
          selectedColor={selectedColor}
          selectedTool={selectedTool}
          docId={params.id}
        />
        <hr style={{ flexBasis: '100%', height: 0, border: 0 }} />
        <ColorPicker
          selectedColor={selectedColor}
          onColorSelect={color => setSelectedColor(color)}
        />
      </div>
    </main>
  );
}
