import { useState } from 'react';

type Props = {
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

export default function ColorPicker() {
  const [primaryColor, setPrimaryColor] = useState('black');
  const colors = [
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
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
              borderRadius: 4,
              ...(color == primaryColor
                ? {
                    width: 40,
                    height: 40,
                    boxShadow: '0px 4px 10px #888',
                    margin: 1,
                  }
                : { width: 36, height: 36, margin: 3 }),
            }}
            onClick={() => setPrimaryColor(color)}
          ></div>
        );
      })}
    </div>
  );
}
