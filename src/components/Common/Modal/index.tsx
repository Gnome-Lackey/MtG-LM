import * as React from "react";
import * as classNames from "classnames";

import Mask from "components/Common/Mask";

import "./styles.scss";

interface ModalProps {
  id: string;
  children: Element;
  closeHandler: Function;
  mask?: boolean;
  show: boolean;
}

const Modal = ({
  id,
  children,
  closeHandler,
  mask,
  show
}: ModalProps): React.FunctionComponentElement<ModalProps> => {
  const handleClose = (ev: React.MouseEvent): void => {
    ev.preventDefault();

    closeHandler();
  };

  return (
    <div className={classNames("modal-container", { show })}>
      <Mask show={mask} />
      <div id={id} className="modal">
        <div className="modal-actions">
          <button type="button" onClick={handleClose}>
            <i className="far fa-times-circle" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
