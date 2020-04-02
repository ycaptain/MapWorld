import React from "react";
import { Canvas as RTFCanvas } from "react-three-fiber";
import { CanvasProps } from "react-three-fiber/canvas";

interface ICanvas extends CanvasProps{
  style?: React.CSSProperties;
}

function Canvas({
  children,
  ...rest
}: ICanvas) {
  return (
    <RTFCanvas style={{ height: "700px" }} {...rest}>
      <color attach="background" args={['lightblue']} />
      <hemisphereLight intensity={0.35} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
      {children}
    </RTFCanvas>
  );
}

export default Canvas;
