import { tools } from '../utils/constants';

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
              border: 'solid 2px black',
              padding: 8,
              borderRadius: 4,
              ...(tool.name == selectedTool
                ? {
                    margin: 1,
                    width: 48,
                    height: 48,
                    boxShadow: '-2px 0px 20px #888',
                  }
                : { width: 44, height: 44, margin: 3 }),
            }}
            onClick={() => onToolSelect(tool.name)}
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
