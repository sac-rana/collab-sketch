type Props = {
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

export default function ColorPicker({ selectedColor, onColorSelect }: Props) {
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    'white',
    'gray',
    'silver',
    'gold',
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {colors.map(color => {
        return (
          <div
            key={color}
            style={{
              backgroundColor: color,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'black',
              margin: 2,
              ...(color == selectedColor
                ? { width: 40, height: 40, boxShadow: '2px 2px 10px' }
                : { width: 36, height: 36 }),
            }}
            onClick={() => onColorSelect(color)}
          ></div>
        );
      })}
    </div>
  );
}
