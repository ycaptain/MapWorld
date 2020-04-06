type Coordicate = {
  x: number;
  y: number;
  z: number;
}

function minus(minuend: Coordicate, subtrahend: Coordicate): Coordicate {
  return {
    x: minuend.x - subtrahend.x,
    y: minuend.y - subtrahend.y,
    z: minuend.z - subtrahend.z,
  };
}

function cross(coorA: Coordicate, coorB: Coordicate): Coordicate {
  return {
    x: coorA.y * coorB.z - coorB.y * coorA.z,
    y: coorB.x * coorA.z - coorA.x * coorB.z,
    z: coorA.x * coorB.y - coorB.x * coorA.y,
  }
}

export {
  Coordicate,
  minus,
  cross,
}
