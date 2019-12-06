import { handleActions } from "redux-actions";

import {
  EMIT_GETTING_STARTED_CARDS_SUCCESS,
  EMIT_SETS_SUCCESS,
  EMIT_SEARCHING_FOR_SET
} from "redux/actions/scryfall";

import { ScryfallState } from "redux/models/ScryfallState";
import { ScryfallAction } from "redux/models/ScryfallAction";

const INITIAL_STATE: ScryfallState = {
  cards: [],
  searching: false,
  set: null
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
      set: action.payload.set
    }),
    [EMIT_SEARCHING_FOR_SET]: (state: ScryfallState, action: ScryfallAction): ScryfallState => ({
      ...state,
      searching: action.payload.searching
    })
  },
  INITIAL_STATE
);
