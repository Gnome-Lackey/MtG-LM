import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import PlayerMangerView from "components/Views/PlayerManager/View";

import { requestGetPlayers } from "redux/creators/players";

import { RootState } from "redux/models/RootState";
import { PlayerDetails } from "models/Player";

interface PlayerMangerViewProps {
  history: History;
  players: PlayerDetails[];
}

interface PlayerMangerViewActions {
  actions: {
    requestGetPlayers: Function;
  };
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps): PlayerMangerViewProps => ({
  history: ownProps.history,
  players: state.players.detailList
});

const mapDispatchToProps = (dispatch: Dispatch): PlayerMangerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetPlayers
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerMangerView));
