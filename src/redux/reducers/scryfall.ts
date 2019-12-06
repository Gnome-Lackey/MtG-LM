import { handleActions } from "redux-actions";

import { EMIT_GETTING_STARTED_CARDS_SUCCESS, EMIT_SETS_SUCCESS } from "redux/actions/scryfall";

import { ScryfallState } from "redux/models/ScryfallState";
import { ScryfallAction } from "redux/models/ScryfallAction";

const INITIAL_STATE: ScryfallState = {
  cards: [],
  sets: []
};

export default handleActions(
  {
    [EMIT_GETTING_STARTED_CARDS_SUCCESS]: (
      state: ScryfallState,
      action: ScryfallAction
    ): ScryfallState => ({
      ...state,
      cards: action.payload.cards
    }),
    [EMIT_SETS_SUCCESS]: (state: ScryfallState, action: ScryfallAction): ScryfallState => ({
      ...state,
      sets: action.payload.sets
    })
  },
  INITIAL_STATE
);
