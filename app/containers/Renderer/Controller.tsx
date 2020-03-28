import React, { useEffect, useRef } from "react";
import { useThree, extend, useFrame } from "react-three-fiber";
import { KeyCode } from "../../utils/KeyCode";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });
const Controller = () => {
  const controls: React.Ref<OrbitControls> = useRef(null);
  const { camera, gl } = useThree();

  useFrame(() => {
    if (controls.current) {
      controls.current.update();
    }
  });

  // const degInRad = (deg: number) => (deg * Math.PI) / 180;

  const onDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {
      case KeyCode.R:
        if (controls.current) {
          controls.current.reset();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (controls.current) {
      controls.current.enableDamping = true;
      controls.current.screenSpacePanning = false;
      controls.current.minDistance = 1;
      controls.current.maxDistance = 500;
      controls.current.maxPolarAngle = Math.PI / 2;
      controls.current.zoomSpeed = 0.7;
    }
  }, [controls.current]);

  useEffect(() => {
    camera.lookAt(0, 0, 0);
    window.addEventListener("keydown", onDown);
    return () => {
      window.removeEventListener("keydown", onDown);
    };
  }, []);

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};

export default Controller;
