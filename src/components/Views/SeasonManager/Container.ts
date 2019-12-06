import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import SeasonMangerView from "components/Views/SeasonManager/View";

import { requestSets } from "redux/creators/scryfall";
import { RootState } from "redux/models/RootState";
import { Set } from "models/Set";

interface SeasonMangerViewProps {
  history: History;
  isRequestLoading: boolean;
  sets: Set[];
}

interface SeasonMangerViewActions {
  actions: {
    requestSets: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): SeasonMangerViewProps => ({
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  sets: state.scryfall.sets
});

const mapDispatchToProps = (dispatch: Dispatch): SeasonMangerViewActions => ({
  actions: bindActionCreators(
    {
      requestSets
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SeasonMangerView));
