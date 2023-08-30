class Board {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  colors = [
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
  tools = {
    pencil: { icon: { url: 'pencil.png', width: 30, height: 30 } },
    erasure: { icon: { url: 'erasure.png', width: 30, height: 30 } },
    line: { icon: { url: 'line.png', width: 30, height: 30 } },
    bucket: { icon: { url: 'bucket.png', width: 30, height: 30 } },
  };
  options = {
    primaryColor: 'black',
    secondaryColor: 'white',
    tool: 'pencil' as keyof typeof this.tools,
    lineWidth: 4,
  };
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw "Couldn't get context";
    this.ctx = ctx;
    this.canvas.addEventListener('mouseenter', () => {
      this.canvas.style.cursor = `url(${
        this.tools[this.options.tool].icon.url
      }), auto`;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.canvas.style.cursor = 'auto';
    });
  }
}
