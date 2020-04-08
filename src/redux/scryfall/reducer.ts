import { handleActions } from "redux-actions";

import {
  EMIT_GETTING_STARTED_CARDS_SUCCESS,
  EMIT_SETS_SUCCESS,
  EMIT_SEARCHING_FOR_SET
} from "redux/scryfall/actions";

import { ScryfallState } from "redux/scryfall/models/State";
import { ScryfallAction } from "redux/scryfall/models/Action";

const INITIAL_STATE: ScryfallState = {
  cards: [],
  searching: false,
  setSearchResults: []
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
      setSearchResults: action.payload.sets
    }),
    [EMIT_SEARCHING_FOR_SET]: (state: ScryfallState, action: ScryfallAction): ScryfallState => ({
      ...state,
      searching: action.payload.searching
    })
  },
  INITIAL_STATE
);
