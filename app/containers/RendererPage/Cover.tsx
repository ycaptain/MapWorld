import React, { useState, useRef } from "react";
import { Back, Radio, Up, PredResult } from "@/components";
import { AlgorithmTypes } from "./";
import classnames from "classnames";
import {
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Wrapper = styled.div`
  background: rgba(10, 10, 10, 0.5);
`;

interface Props {
  algorithm: AlgorithmTypes;
  setAlgorithm: (algorithm: AlgorithmTypes) => void;
}

const Cover: React.FC<Props> = ({ algorithm, setAlgorithm }) => {
  const [showResult, setShowResult] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  console.info('cover load');
  return (
    <div className="absolute w-full h-full top-0 invisible" ref={rootRef}>
      <Up className="ml-4 mt-4">
        <Back />
      </Up>
      <Up className="bottom-0 mb-12 transform left-1/2 -translate-x-1/2">
        <Radio algorithm={algorithm} setAlgorithm={setAlgorithm} />
      </Up>
      {/* <div
        className={classnames(
          "hidden relative ml-6 h-1/2 max-w-xs bg-teal-500 top-1/2 transform -translate-y-1/2",
          { hidden: !showResult }
        )}
      >
        <Up className="w-10 h-10">
          <PredResult />
        </Up>
      </div> */}
      {/* {rootRef.current && (
        <Drawer
          getContainer={rootRef.current}
          placement="left"
          visible={showResult}
        > */}
      <Wrapper
        className={classnames(
        "flex flex-col visible shadow-xl text-gray-500 relative transition-transform duration-300 ease-in-out rounded-lg ml-6 h-3/4 w-80 bg-transparent top-1/2 transform -translate-y-1/2",
          {
            "-translate-x-80": !showResult,
          }
        )}
        onMouseEnter={() => setShowResult(true)}
      >
        <header className="h-10 w-full flex items-center">
          <FontAwesomeIcon
            size="lg"
            className="absolute right-0 mr-3 my-auto cursor-pointer hover:text-teal-500"
            icon={faTimesCircle}
            onClick={() => setShowResult(false)}
          />
          <div className="w-full text-center font-medium text-lg">Analyzation</div>
        </header>

        <div className="w-full mb-2">
          <PredResult />
        </div>
        <div className="w-full mb-2">
          <PredResult />
        </div>
        <div className="w-full mb-2">
          <PredResult />
        </div>
      </Wrapper>
      {/* </Drawer>
      )} */}
    </div>
  );
};

export default React.memo(Cover);
