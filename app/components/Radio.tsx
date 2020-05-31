import React, { memo } from "react";
import { Radio as AntRadio } from "antd";
import { AlgorithmTypes } from "@/containers/RendererPage";
import classnames from "classnames";

interface CustomBtnProps {
  value: string;
  name: string;
  className?: string;
}

const CustomBtn: React.FC<CustomBtnProps> = memo(
  ({ value, name, className, ...rest }) => (
    <AntRadio.Button value={value} className={classnames("w-24 text-center px-0", className)}>
      {name}
    </AntRadio.Button>
  )
);

interface Props {
  algorithm: AlgorithmTypes;
  setAlgorithm: (algorithm: AlgorithmTypes) => void;
}

const Radio: React.FC<Props> = React.memo(({ algorithm, setAlgorithm }) => {
  return (
    <AntRadio.Group
      onChange={(e) => setAlgorithm(e.target.value)}
      defaultValue={algorithm}
    >
      <CustomBtn value="deeplab" name="Deep Lab" />
      <CustomBtn value="unet" name="UNet" />
      <CustomBtn value="cyclegan" name="Cycle GAN" />
    </AntRadio.Group>
  );
});

export { Radio };
