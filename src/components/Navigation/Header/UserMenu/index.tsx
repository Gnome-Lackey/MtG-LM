import * as React from "react";
import classNames from "classnames";

import Spinner from "components/Common/Spinner";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import "./styles.scss";

interface UserMenuProps {
  loggingOut: boolean;
  logoutHandler: React.MouseEventHandler<HTMLButtonElement>;
  userName: string;
};

const UserMenu = ({
  loggingOut,
  logoutHandler,
  userName
}: UserMenuProps): React.FunctionComponentElement<UserMenuProps> => {
  const reference = React.useRef();

  const [expanded, setExpanded] = React.useState(false);

  useOnClickOutside(reference, () => setExpanded(false));

  return (
    <div className="user-menu" ref={reference}>
      <button
        className={classNames("user-menu-toggle action", { show: expanded })}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        <i className="far fa-user" />
      </button>
      <ul className={classNames("user-menu-items", { show: expanded })}>
        <li className="user-menu-item">
          <p className="title">
            <i className="fas fa-crown" />
            {userName}
          </p>
        </li>
        <li className="user-menu-item">
          <button className="action" type="button" onClick={logoutHandler}>
            {loggingOut ? <Spinner inline /> : <i className="fas fa-sign-out-alt" />}
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
