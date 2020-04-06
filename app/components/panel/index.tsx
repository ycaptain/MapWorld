import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Panel: React.FC<Panel> = (props) => {
  const { loadMap } = props;
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
      </div>
    </div>
  );
};

type Panel = {
  loadMap: Function;
};

export default Panel;
