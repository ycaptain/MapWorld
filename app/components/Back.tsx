import React from "react";
import { useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconMenu } from "./";

const Back: React.FC = () => {
  const history = useHistory();

  return (
    <IconMenu
      icon={faChevronLeft}
      onClick={() => history.goBack()}
    />
  );
};

export { Back };
