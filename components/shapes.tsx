import { shapes } from '@/lib/constants';

type Props = {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
};

export default function Shapes({ selectedTool, setSelectedTool }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 320,
        flexWrap: 'wrap',
        margin: 10,
        alignItems: 'flex-start',
      }}
    >
      {Array.from(shapes).map(([shape, svgImg]) => {
        return (
          <div
            key={shape}
            style={{
              borderWidth: selectedTool == shape ? 4 : 2,
              borderStyle: 'solid',
              borderColor: 'black',
              margin: 2,
              padding: 0,
              display: 'flex',
            }}
            onClick={() => setSelectedTool(shape)}
          >
            <svg
              version='1.1'
              width='32'
              height='30'
              xmlns='http://www.w3.org/2000/svg'
            >
              {svgImg}
            </svg>
          </div>
        );
      })}
    </div>
  );
}
