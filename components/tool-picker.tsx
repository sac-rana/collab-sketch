import { useState } from 'react';

type Props = {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
};

export default function ToolPicker() {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const tools = [
    { name: 'pencil', icon: { url: 'pencil.png', width: 36, height: 36 } },
    { name: 'erasure', icon: { url: 'erasure.png', width: 36, height: 36 } },
    { name: 'bucket', icon: { url: 'bucket.png', width: 36, height: 36 } },
    { name: 'line', icon: { url: 'line.png', width: 36, height: 36 } },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {tools.map(tool => {
        return (
          <div
            key={tool.name}
            style={{
              border: 'solid 2px black',
              width: 44,
              height: 44,
              margin: 3,
              padding: 8,
              borderRadius: 4,
              ...(tool.name == selectedTool
                ? {
                    margin: 1,
                    width: 46,
                    height: 46,
                    boxShadow: '2px 0px 20px #888',
                  }
                : {}),
            }}
            onClick={() => setSelectedTool(tool.name)}
          >
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src={tool.icon.url}
              alt={`${tool.name}-tool`}
            />
          </div>
        );
      })}
    </div>
  );
}
