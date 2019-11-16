import * as React from "react";

import "./styles.scss";

interface MaskProps {
  show: boolean;
}

const Mask = ({ show }: MaskProps): React.FunctionComponentElement<MaskProps> => {
  React.useEffect(() => {
    const body = document.querySelector("body");

    body.setAttribute("class", show ? "locked" : "unlocked");
  }, [show]);

  return show ? <div className="mask" /> : null;
};

export default Mask;
