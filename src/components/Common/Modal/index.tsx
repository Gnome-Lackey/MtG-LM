import * as React from "react";
import * as classNames from "classnames";

import Mask from "components/Common/Mask";

import "./styles.scss";

interface ModalProps {
  id: string;
  children: React.FunctionComponentElement<any> | string;
  closeHandler: Function;
  mask?: boolean;
  title?: string;
  grow?: boolean;
}

const Modal = ({
  id,
  children,
  closeHandler,
  mask,
  title,
  grow
}: ModalProps): React.FunctionComponentElement<ModalProps> => {
  const handleClose = (ev: React.MouseEvent): void => {
    ev.preventDefault();

    closeHandler();
  };

  return (
    <div className="modal-container">
      <Mask show={mask} />
      <div id={id} className={classNames("modal", { grow })}>
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button className="btn-close" type="button" onClick={handleClose}>
            <i className="far fa-times-circle" />
          </button>
        </div>
        <div id={`${id}Content`} className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
