async function loadJSON(filePath) {
  const raw = await require("fs").promises.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function readCoors(filePath) {
  const data = await loadJSON(filePath);
  const coors = data.buildings.map((building) => ({
    coordinates: building.coordinates,
    properties: building.properties,
  }));

  return coors;
}

module.exports = { loadJSON, readCoors };
