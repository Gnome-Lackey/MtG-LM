import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import RoleManagerView from "components/Views/RoleManager/View";

import { requestGetPlayerRoles, requestUpdatePlayerRole } from "redux/player/creators";

import { RootState } from "redux/models/RootState";
import { PlayerRole } from "models/Player";

interface RoleManagerViewProps {
  history: History;
  isRequestLoading: boolean;
  isRoleUpdating: boolean;
  playerRoles: PlayerRole[];
}

interface RoleManagerViewActions {
  actions: {
    requestGetPlayerRoles: Function;
    requestUpdatePlayerRole: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): RoleManagerViewProps => ({
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  isRoleUpdating: state.players.updatingRole,
  playerRoles: state.players.roles
});

const mapDispatchToProps = (dispatch: Dispatch): RoleManagerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetPlayerRoles,
      requestUpdatePlayerRole
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoleManagerView));
