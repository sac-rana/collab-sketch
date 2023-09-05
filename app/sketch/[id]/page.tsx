'use client';
import styles from './page.module.css';

import { useState } from 'react';
import ColorPicker from '@/components/color-picker';
import ToolPicker from '@/components/tool-picker';
import DBCanvas from '@/components/db-canvas';
import Shapes from '@/components/shapes';

export default function Home({ params }: { params: { id: string } }) {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <main className={styles.main}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
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
        <Shapes selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <hr style={{ flexBasis: '100%', height: 0, border: 0 }} />
        <ColorPicker
          selectedColor={selectedColor}
          onColorSelect={color => setSelectedColor(color)}
        />
      </div>
    </main>
  );
}
