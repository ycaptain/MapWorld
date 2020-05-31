import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

type Props = {
  icon: IconProp;
} & ButtonProps;

const IconMenu: React.FC<Props> = ({ icon, ...rest }) => {
  return (
    <Button
      className="hover:text-white hover:outline-none focus:outline-none hover:bg-teal-400 bg-gray-500 border-none text-xs font-semibold leading-normal"
      size="middle"
      type="primary"
      shape="circle-outline"
      {...rest}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export { IconMenu };
