import * as React from "react";
import * as classNames from "classnames";

import Dropdown from "components/Form/Dropdown";
import Spinner from "components/Common/Spinner";

import { toCapitalCase } from "utils/string";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { PlayerRole } from "models/Player";

import { ACCOUNT_TYPE_ADMIN } from "constants/accountTypes";

import "./styles.scss";

interface RoleListItemProps {
  isRoleUpdating: boolean;
  options: DropdownOption[];
  playerRole: PlayerRole;
  selectedRoleId: string;
  selectHandler: Function;
}

const RoleListItem = ({
  isRoleUpdating,
  options,
  playerRole,
  selectedRoleId,
  selectHandler
}: RoleListItemProps): React.FunctionComponentElement<RoleListItemProps> => {
  const showSpinner = isRoleUpdating && selectedRoleId === playerRole.id;
  const isAdminAccount = playerRole.role === ACCOUNT_TYPE_ADMIN;

  return (
    <li key={playerRole.id} className="role-list-item">
      {showSpinner ? (
        <Spinner inline />
      ) : (
        <i
          className={classNames(
            "role-icon",
            "fas",
            { "fa-chess-king": isAdminAccount },
            { "fa-user": !isAdminAccount }
          )}
        />
      )}
      <div className="role-details">
        <p className="player-names">
          {playerRole.displayName}&nbsp;
          <span className="player-user-name">({playerRole.userName})</span>
        </p>
        <p className="player-email">{playerRole.email}</p>
      </div>
      <Dropdown
        options={options}
        selectHandler={(option: DropdownOption) => selectHandler(playerRole.id, option.key)}
        placeholder={toCapitalCase(playerRole.role)}
      />
    </li>
  );
};

export default RoleListItem;
