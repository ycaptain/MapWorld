import React, { useState, useEffect } from "react";

import {
  Item,
} from "@/components/renderer";
// import Plane from "../components/renderer/Plane";
// import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";
// import {Button} from 'antd';
import Renderer from "./Renderer";
import Cover from "./Cover";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export type AlgorithmTypes = "deeplab" | "unet" | "cyclegan";

const RendererPage: React.FC<Props> = ({ buildings, render }) => {


  return (
    <div className="relative w-full h-full">
      {/* <Panel /> */}
      <Renderer />
      <Cover />
    </div>
  );
};

export default RendererPage;
