function generateCoors() {
  const items = [];

  for (let i = 0; i < 100; i++) {
    const posX = Math.random() * 50 - 25;
    const posY = Math.random() * 50 - 25;
    const height = 10 + Math.random() * 20;

    const item = {
      coordinates: [
        {
          x: 0 + posX,
          y: 0 + posY,
          z: 0,
        },
        {
          x: 0 + posX,
          y: 5 + posY,
          z: 0,
        },
        {
          x: 5 + posX,
          y: 5 + posY,
          z: 0,
        },
        {
          x: 5 + posX,
          y: 0 + posY,
          z: 0,
        },
      ],
      properties: {
        height: height,
      },
    };
    items.push(item);
  }

  return {
    buildings: items
  };
}

const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, '../resources/fuck.json');
const items = generateCoors();
const data = JSON.stringify(items);
fs.writeFileSync(filePath, data);
