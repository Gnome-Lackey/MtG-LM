import * as React from "react";
import classNames from "classnames";

import { History } from "history";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import { APP_MENU_ITEMS, ADMIN_APP_MENU_ITEMS } from "constants/appMenuItems";
import { ACCOUNT_TYPE_ADMIN } from "constants/accountTypes";

import "./styles.scss";

interface AppMenuProps {
  accountType: string;
  history: History;
}

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

const renderMapMenuItem = (
  menuItem: MenuItem,
  navigateTo: Function
): React.FunctionComponentElement<any> => (
  <li key={`app-menu-item-${menuItem.label}`} className="app-menu-item">
    <button type="button" className="btn-navigate" onClick={() => navigateTo(menuItem.route)}>
      <i className={menuItem.icon} />
      {menuItem.label}
    </button>
  </li>
);

const AppMenu = ({
  accountType,
  history
}: AppMenuProps): React.FunctionComponentElement<AppMenuProps> => {
  const reference = React.useRef();
  const isAdmin = accountType === ACCOUNT_TYPE_ADMIN;

  const [expanded, setExpanded] = React.useState(false);

  useOnClickOutside(reference, () => setExpanded(false));

  const navigateTo = (path: string): void => {
    history.push(path);

    setExpanded(false);
  };

  return (
    <div className="app-menu" ref={reference}>
      <button
        className={classNames("app-menu-toggle", { show: expanded })}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        <i className="fas fa-bars" />
      </button>
      <ul className={classNames("app-menu-items", { show: expanded })}>
        <li className="app-menu-item title">
          <p>Main Menu</p>
        </li>
        {APP_MENU_ITEMS.map((menuItem) => renderMapMenuItem(menuItem, navigateTo))}
        {isAdmin
          ? ADMIN_APP_MENU_ITEMS.map((menuItem) => renderMapMenuItem(menuItem, navigateTo))
          : null}
      </ul>
    </div>
  );
};

export default AppMenu;
