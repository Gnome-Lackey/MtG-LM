import * as React from "react";
import { History } from "history";

import AppMenu from "components/Navigation/Header/AppMenu";
import UserMenu from "components/Navigation/Header/UserMenu";

import { User } from "models/User";

import { ACCOUNT_TYPE_USER } from "constants/accountTypes";

import "./styles.scss";

interface HeaderProps {
  history: History;
  loggingOut: boolean;
  logoutHandler: React.MouseEventHandler<HTMLButtonElement>;
  user: User;
}

const Header = ({
  history,
  loggingOut,
  logoutHandler,
  user
}: HeaderProps): React.FunctionComponentElement<HeaderProps> => {
  const userName = user ? user.userName : "";
  const accountType = user ? user.accountType : ACCOUNT_TYPE_USER;

  return (
    <header className="app-header">
      <AppMenu history={history} accountType={accountType} />
      <h1>MtG: League Manager</h1>
      <UserMenu loggingOut={loggingOut} logoutHandler={logoutHandler} userName={userName} />
    </header>
  );
};

export default Header;
