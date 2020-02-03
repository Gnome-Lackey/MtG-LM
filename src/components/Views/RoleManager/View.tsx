import * as React from "react";
import * as classNames from "classnames";
import { RouteComponentProps } from "react-router";

import Dropdown from "components/Form/Dropdown";
import Spinner from "components/Common/Spinner";

import useDataFetch from "components/Hooks/useDataFetch";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { PlayerRole } from "models/Player";

import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPES } from "constants/accountTypes";

import "./styles.scss";

interface RoleManagerViewActions {
  requestGetPlayerRoles: Function;
  requestUpdatePlayerRole: Function;
}

interface RoleManagerViewProps extends RouteComponentProps {
  actions: RoleManagerViewActions;
  isRequestLoading: boolean;
  isRoleUpdating: boolean;
  playerRoles: PlayerRole[];
}

const toCapitalCase = (text: string): string => `${text.charAt(0)}${text.slice(1).toLowerCase()}`;

const RoleManagerView = ({
  actions,
  isRequestLoading,
  isRoleUpdating,
  playerRoles
}: RoleManagerViewProps): React.FunctionComponentElement<RoleManagerViewProps> => {
  useDataFetch(!playerRoles.length, actions.requestGetPlayerRoles);

  const [selectedRole, setSelectedRole] = React.useState(null);

  const accountTypeOptions = ACCOUNT_TYPES.map((type) => ({
    label: toCapitalCase(type),
    key: type
  }));

  const handleSelect = (id: string, role: string): void => {
    setSelectedRole(id);

    actions.requestUpdatePlayerRole(id, role);
  };

  return (
    <div className="role-manager-view">
      <ul className="player-list">
        {playerRoles.map((playerRole) => (
          <li key={playerRole.id} className="player-list-item">
            {isRoleUpdating && selectedRole === playerRole.id ? (
              <Spinner inline />
            ) : (
              <i
                className={classNames(
                  "player-role-icon",
                  "fas",
                  { "fa-chess-king": playerRole.role === ACCOUNT_TYPE_ADMIN },
                  { "fa-user": playerRole.role !== ACCOUNT_TYPE_ADMIN }
                )}
              />
            )}
            <div className="player-details">
              <p className="player-names">
                {playerRole.displayName}&nbsp;
                <span className="player-user-name">({playerRole.userName})</span>
              </p>
              <p className="player-email">{playerRole.email}</p>
            </div>
            <Dropdown
              options={accountTypeOptions}
              selectHandler={(option: DropdownOption) => handleSelect(playerRole.id, option.key)}
              placeholder={toCapitalCase(playerRole.role)}
            />
          </li>
        ))}
      </ul>
      {isRequestLoading ? <Spinner /> : null}
    </div>
  );
};

export default RoleManagerView;
