import * as React from "react";
import * as classNames from "classnames";

import Spinner from "components/Common/Spinner";
import RoleListItem from "components/Views/RoleManager/RoleList/RoleListItem";
import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

import { PlayerRole } from "models/Player";

import "./styles.scss";

interface RoleListProps {
  isRequestLoading: boolean;
  isRoleUpdating: boolean;
  options: DropdownOption[];
  playerRoles: PlayerRole[];
  selectedRoleId: string;
  selectHandler: Function;
}

const RoleList = ({
  isRequestLoading,
  isRoleUpdating,
  options,
  playerRoles,
  selectedRoleId,
  selectHandler
}: RoleListProps): React.FunctionComponentElement<RoleListProps> => (
  <ul className={classNames("role-list", { loading: isRequestLoading })}>
    {isRequestLoading ? (
      <Spinner inline />
    ) : (
      playerRoles.map((playerRole) => (
        <RoleListItem
          key={playerRole.id}
          isRoleUpdating={isRoleUpdating}
          playerRole={playerRole}
          options={options}
          selectHandler={selectHandler}
          selectedRoleId={selectedRoleId}
        />
      ))
    )}
  </ul>
);

export default RoleList;
