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
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </RTFCanvas>
  );
}

export default Canvas;
