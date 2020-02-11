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
}: RoleListProps): React.FunctionComponentElement<RoleListProps> => {
  let content: JSX.Element | JSX.Element[] = (
    <li className="empty-message-list-item">
      <p className="empty-message">Sorry buddy, nobody has signed up yet.</p>
    </li>
  );

  if (isRequestLoading) {
    content = <Spinner inline />;
  } else if (playerRoles.length) {
    content = playerRoles.map((playerRole) => (
      <RoleListItem
        key={playerRole.id}
        isRoleUpdating={isRoleUpdating}
        playerRole={playerRole}
        options={options}
        selectHandler={selectHandler}
        selectedRoleId={selectedRoleId}
      />
    ));
  }

  return <ul className={classNames("role-list", { loading: isRequestLoading })}>{content}</ul>;
};

export default RoleList;
