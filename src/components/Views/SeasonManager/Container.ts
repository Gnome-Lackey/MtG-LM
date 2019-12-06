import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import SeasonMangerView from "components/Views/SeasonManager/View";

import { requestGetSetByCode } from "redux/creators/scryfall";
import { RootState } from "redux/models/RootState";
import { Set } from "models/Set";

interface SeasonMangerViewProps {
  history: History;
  searchForSet: boolean;
  potentialSet: Set;
}

interface SeasonMangerViewActions {
  actions: {
    requestGetSetByCode: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): SeasonMangerViewProps => ({
  history: ownProps.history,
  searchForSet: state.scryfall.searching,
  potentialSet: state.scryfall.set
});

const mapDispatchToProps = (dispatch: Dispatch): SeasonMangerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetSetByCode
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SeasonMangerView));
