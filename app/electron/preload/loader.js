async function loadJSON(filePath) {
  const raw = await require('fs').promises.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function readJSON(filePath) {
  const data = await loadJSON(filePath);
  const { meta, roadImg } = data;

  const coors = data.buildings.map(building => ({
    coordinates: building.coordinates,
    properties: building.properties,
  }));
  return { buildings: coors, meta, roadImg };
}

module.exports = { loadJSON, readJSON };
