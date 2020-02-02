import * as React from "react";
import * as classNames from "classnames";
import { RouteComponentProps } from "react-router";

import useDataFetch from "components/Hooks/useDataFetch";
import Dropdown from "components/Form/Dropdown";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { PlayerRole } from "models/Player";

import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPES } from "constants/accountTypes";

import "./styles.scss";

interface RoleManagerViewActions {
  requestGetPlayerRoles: Function;
}

interface RoleManagerViewProps extends RouteComponentProps {
  actions: RoleManagerViewActions;
  playerRoles: PlayerRole[];
}

const toCapitalCase = (text: string): string => `${text.charAt(0)}${text.slice(1).toLowerCase()}`;

const RoleManagerView = ({
  actions,
  playerRoles
}: RoleManagerViewProps): React.FunctionComponentElement<RoleManagerViewProps> => {
  useDataFetch(!playerRoles.length, actions.requestGetPlayerRoles);

  const accountTypeOptions = ACCOUNT_TYPES.map((type) => ({
    label: toCapitalCase(type),
    key: type
  }));

  const handleSelect = (option: DropdownOption): void => {
    console.log(option);
  };

  return (
    <div className="role-manager-view">
      <ul className="player-list">
        {playerRoles.map((playerRole) => (
          <li key={playerRole.id} className="player-list-item">
            <i
              className={classNames(
                "player-role-icon",
                "fas",
                { "fa-chess-king": playerRole.role === ACCOUNT_TYPE_ADMIN },
                { "fa-user": playerRole.role !== ACCOUNT_TYPE_ADMIN }
              )}
            />
            <div className="player-details">
              <p className="player-names">
                {playerRole.displayName}&nbsp;
                <span className="player-user-name">({playerRole.userName})</span>
              </p>
              <p className="player-email">{playerRole.email}</p>
            </div>
            <Dropdown
              options={accountTypeOptions}
              selectHandler={handleSelect}
              placeholder={toCapitalCase(playerRole.role)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagerView;
