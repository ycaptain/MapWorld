import React from "react";
import { Canvas as RTFCanvas } from "react-three-fiber";
import { CanvasProps } from "react-three-fiber/canvas";
import { Color } from "three";

interface ICanvas extends CanvasProps {
  style?: React.CSSProperties;
  bgColor?: number;
}

const Canvas: React.FC<ICanvas> = ({
  children,
  bgColor = 0xadd8e6,
  ...rest
}) => {
  return (
    <RTFCanvas shadowMap style={{ height: "700px" }} {...rest}>
      <color attach={"background"} args={[bgColor]} />
      <hemisphereLight intensity={0.35} />
      <spotLight position={[50, 50, 100]} angle={0.3} penumbra={1} intensity={1.5} shadow-mapSize-width={256} shadow-mapSize-height={256} />
      {children}
    </RTFCanvas>
  );
};

export default Canvas;
