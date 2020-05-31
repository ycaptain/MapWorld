import React from "react";

const Axes: React.FC = (props) => {
  return (
    <mesh {...props}>
      <axesHelper args={[100]} />
    </mesh>
  );
};

export { Axes };
