import React, {useState} from "react";
import {Button, Input} from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {Item} from "../renderer/Building";

import * as thrift from 'thrift';

const Panel: React.FC<Panel> = (props) => {
  const { loadMap } = props;

  const [cfg_path, setCfg_path] = useState<string>("");
  const [model_path, setModel_path] = useState<string>("");

  const initPred = async () => {
    // var transport = new thrift.TBufferedTransport("/thrift/service/tutorial/");
    // var protocol  = new thrift.Protocol(transport);
  };

  return (
    <div className={"flex h-full"}>
      <div className={"flex w-12 bg-teal-400 h-full"}>
        <Link to="/" className={"relative bottom-0 mx-auto my-2"}>
          <Button
            className={
              "hover:text-white hover:outline-none focus:outline-none hover:bg-teal-400 border-none bg-teal-500 text-xs font-semibold rounded-full leading-normal"
            }
            type="primary"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Link>
      </div>
      <div>
        <Button onClick={() => loadMap()}>Load</Button>
        <div>
          <Input value={cfg_path} onChange={e => setCfg_path(e.target.value)}/>
          <Input value={model_path} onChange={e => setModel_path(e.target.value)}/>
          <Button onClick={() => initPred()}>Init</Button>
        </div>
      </div>
    </div>
  );
};

type Panel = {
  loadMap: Function;
};

export default Panel;
