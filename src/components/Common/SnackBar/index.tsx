import * as React from "react";
import * as classNames from "classnames";

import "./styles.scss";

interface SnackbarProps {
  children: string;
  duration?: number;
  closeHandler?: Function;
  show: boolean;
  sticky?: boolean;
}

const Snackbar = ({
  children,
  closeHandler,
  duration,
  show,
  sticky
}: SnackbarProps): React.FunctionComponentElement<SnackbarProps> => {
  let timeout: NodeJS.Timeout;

  const [visible, setVisible] = React.useState(false);

  const handleClose = (): void => {
    clearTimeout(timeout);

    setVisible(false);

    if (closeHandler) {
      closeHandler();
    }
  };

  if (visible && !sticky) {
    timeout = setTimeout(() => {
      handleClose();
    }, duration || 3500);
  }

  React.useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div className={classNames("snackbar", { show: visible })}>
      <p className="message">{children}</p>
      <button className="btn-close" type="button" onClick={handleClose}>
        <i className="far fa-times-circle" />
      </button>
    </div>
  );
};

export default Snackbar;
