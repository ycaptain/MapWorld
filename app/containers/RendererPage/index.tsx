import React, { useState, useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  Item,
} from "@/components/renderer";
// import Plane from "../components/renderer/Plane";
// import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";
// import {Button} from 'antd';
import { renderStateType } from "@/reducers/render";
import { addBuildings, reset } from "@/actions/render";
import Renderer from "./Renderer";
import Cover from "./Cover";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export type AlgorithmTypes = "deeplab" | "unet" | "cyclegan";

const RendererPage: React.FC<Props> = ({ render }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [algorithm, setAlgorithm] = useState<AlgorithmTypes>("deeplab");

  useEffect(() => {
    console.info(render);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* <Panel /> */}
      <Renderer items={items} />
      <Cover algorithm={algorithm} setAlgorithm={setAlgorithm} />
    </div>
  );
};

function mapStateToProps(state: renderStateType) {
  return {
    render: state.render,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addBuildings,
      reset,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RendererPage);
