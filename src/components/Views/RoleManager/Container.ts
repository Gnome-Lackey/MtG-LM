import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import RoleManagerView from "components/Views/RoleManager/View";

import { requestGetPlayerRoles } from "redux/creators/players";

import { RootState } from "redux/models/RootState";
import { PlayerRole } from "models/Player";

interface RoleManagerViewProps {
  history: History;
  playerRoles: PlayerRole[];
}

interface RoleManagerViewActions {
  actions: {
    requestGetPlayerRoles: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): RoleManagerViewProps => ({
  history: ownProps.history,
  playerRoles: state.players.roles
});

const mapDispatchToProps = (dispatch: Dispatch): RoleManagerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetPlayerRoles
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoleManagerView));
