async function loadJSON(filePath) {
  const raw = await require("fs").promises.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function readJSON(filePath) {
  const data = await loadJSON(filePath);
  const coors = data.buildings.map((building) => ({
    coordinates: building.coordinates,
    properties: building.properties,
  }));
  const mMeta = data.meta;
  const roadImgPath = data.roadImg;
  return {coors, mMeta, roadImgPath};
}

module.exports = { loadJSON, readJSON };
