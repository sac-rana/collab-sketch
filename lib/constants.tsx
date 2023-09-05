export const tools = new Map([
  ['pencil', { icon: 'pencil.png', cursor: 'pencil_cursor.png' }],
  ['eraser', { icon: 'eraser.png', cursor: 'eraser_cursor.png' }],
  ['bucket', { icon: 'bucket.png', cursor: 'bucket_cursor.png' }],
]);

export const colors = [
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

// list of svg shapes
export const shapes = new Map([
  [
    'line',
    <line
      key='line'
      x1='2'
      y1='2'
      x2='30'
      y2='28'
      stroke='black'
      strokeWidth={2}
    />,
  ],
  [
    'circle',
    <circle
      key='circle'
      cx='16'
      cy='15'
      r='12'
      stroke='black'
      strokeWidth={2}
      fill='transparent'
    />,
  ],
  [
    'rect',
    <rect
      key='rect'
      x='3'
      y='3'
      width='26'
      height='24'
      stroke='black'
      strokeWidth={2}
      fill='transparent'
    />,
  ],
]);
