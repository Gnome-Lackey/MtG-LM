import * as React from "react";
import { RouteComponentProps } from "react-router";

import RoleList from "components/Views/RoleManager/RoleList";

import useDataFetch from "components/Hooks/useDataFetch";

import StringUtility from "utils/string";

import { PlayerRole } from "models/Player";

import { ACCOUNT_TYPES } from "constants/accountTypes";

import "./styles.scss";

const stringUtility = new StringUtility();

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

const RoleManagerView = ({
  actions,
  isRequestLoading,
  isRoleUpdating,
  playerRoles
}: RoleManagerViewProps): React.FunctionComponentElement<RoleManagerViewProps> => {
  useDataFetch(!playerRoles.length, actions.requestGetPlayerRoles);

  const [selectedRoleId, setSelectedRoleId] = React.useState(null);

  const accountTypeOptions = ACCOUNT_TYPES.map((type) => ({
    label: stringUtility.toCapitalCase(type),
    key: type
  }));

  const handleSelect = (id: string, role: string): void => {
    setSelectedRoleId(id);

    actions.requestUpdatePlayerRole(id, role);
  };

  return (
    <div className="role-manager-view">
      <RoleList
        isRequestLoading={isRequestLoading}
        isRoleUpdating={isRoleUpdating}
        options={accountTypeOptions}
        playerRoles={playerRoles}
        selectHandler={handleSelect}
        selectedRoleId={selectedRoleId}
      />
    </div>
  );
};

export default RoleManagerView;
