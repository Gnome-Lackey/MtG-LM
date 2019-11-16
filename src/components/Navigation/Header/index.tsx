import * as React from "react";
import { History } from "history";

import AppMenu from "components/Navigation/Header/AppMenu";
import UserMenu from "components/Navigation/Header/UserMenu";

import "./styles.scss";

interface HeaderProps {
  history: History;
  loggingOut: boolean;
  logoutHandler: React.MouseEventHandler<HTMLButtonElement>;
  userName: string;
}

const Header = ({
  history,
  loggingOut,
  logoutHandler,
  userName
}: HeaderProps): React.FunctionComponentElement<HeaderProps> => (
  <header className="app-header">
    <AppMenu history={history} />
    <h1>MtG: League Manager</h1>
    <UserMenu loggingOut={loggingOut} logoutHandler={logoutHandler} userName={userName} />
  </header>
);

export default Header;
