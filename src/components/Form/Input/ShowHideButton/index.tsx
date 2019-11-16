import * as React from "react";

import "./styles.scss";

interface ShowHideButtonProps {
  clickHandler: Function;
  show: boolean;
}

const ShowHideButton = ({
  clickHandler,
  show
}: ShowHideButtonProps): React.FunctionComponentElement<ShowHideButtonProps> => (
  <button tabIndex={-1} type="button" className="btn-show-hide" onClick={() => clickHandler(!show)}>
    {show ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
  </button>
);

export default ShowHideButton;
