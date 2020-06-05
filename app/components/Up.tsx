import React from "react";
import classnames from "classnames";

const Up: React.FC<{
  className?: string;
}> = ({ children, className, ...rest }) => (
  <div className={classnames("absolute visible", className)} {...rest}>
    {children}
  </div>
);

export { Up };
