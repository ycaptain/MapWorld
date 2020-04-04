import React from "react";

const Light: React.FC = (props) => {

  return (

      <spotLightHelper  position={[30, 30, 30]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
  )
}

export default Light;
