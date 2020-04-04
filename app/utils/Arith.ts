class Coordicate {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }
}

function minus(minuend: Coordicate, subtrahend: Coordicate): Coordicate {
  return new Coordicate(
    minuend.x - subtrahend.x,
    minuend.y - subtrahend.y,
    minuend.z - subtrahend.z,
  );
}

function cross(coorA: Coordicate, coorB: Coordicate): Coordicate {
  return new Coordicate(
    coorA.y * coorB.z - coorB.y * coorA.z,
    coorB.x * coorA.z - coorA.x * coorB.z,
    coorA.x * coorB.y - coorB.x * coorA.y,
  )
}

export {
  Coordicate,
  minus,
  cross,
}
