import { handleActions } from "redux-actions";

import { EMIT_GETTING_STARTED_CARDS_SUCCESS } from "redux/actions/cards";

import { CardState } from "redux/models/CardState";
import { CardAction } from "redux/models/CardAction";

const INITIAL_STATE: CardState = {
  list: []
};

export default handleActions(
  {
    [EMIT_GETTING_STARTED_CARDS_SUCCESS]: (state: CardState, action: CardAction): CardState => ({
      ...state,
      list: action.payload.cards
    })
  },
  INITIAL_STATE
);
