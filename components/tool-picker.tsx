import { tools } from '../lib/constants';
import Image from 'next/image';

type Props = {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
};

export default function ToolPicker({ selectedTool, onToolSelect }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 8,
      }}
    >
      {tools.map(tool => {
        return (
          <div
            key={tool.name}
            style={{
              position: 'relative',
              border: 'solid 2px black',
              padding: 8,
              borderRadius: 4,
              ...(tool.name == selectedTool
                ? {
                    margin: 1,
                    boxShadow: '-2px 0px 20px #888',
                  }
                : { margin: 5 }),
            }}
            onClick={() => onToolSelect(tool.name)}
          >
            <Image
              src={'/' + tool.icon.url}
              alt={`${tool.name}-tool`}
              width={tool.name == selectedTool ? 40 : 32}
              height={tool.name == selectedTool ? 40 : 32}
            />
          </div>
        );
      })}
    </div>
  );
}
