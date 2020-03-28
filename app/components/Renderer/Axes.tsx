import React from "react";

function Axes(props: any) {

  return (
    <mesh
    {...props}
    >
      <axesHelper args={[100]} />
    </mesh>
  )

}

export default Axes;
