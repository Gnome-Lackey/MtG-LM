import * as React from "react";
import { RouteComponentProps } from "react-router";

import RoleList from "components/Views/RoleManager/RoleList";

import useDataFetch from "components/Hooks/useDataFetch";

import { PlayerRole } from "models/Player";

import { ACCOUNT_TYPES } from "constants/accountTypes";

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

  const [selectedRoleId, setSelectedRoleId] = React.useState(null);

  const accountTypeOptions = ACCOUNT_TYPES.map((type) => ({
    label: toCapitalCase(type),
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
