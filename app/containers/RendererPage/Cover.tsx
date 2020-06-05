import React, { useState, useRef } from "react";
import { Back, Radio, Up, PredResult } from "@/components";
import classnames from "classnames";
import {
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Wrapper = styled.div`
  background: rgba(10, 10, 10, 0.5);
`;


const Cover: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute w-full h-full top-0 invisible" ref={rootRef}>
      <Up className="ml-4 mt-4">
        <Back />
      </Up>
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
      </Wrapper>
      {/* </Drawer>
      )} */}
    </div>
  );
};

export default React.memo(Cover);
