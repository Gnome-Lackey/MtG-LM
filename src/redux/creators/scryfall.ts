import * as scryfallService from "services/scryfall";
import * as queryString from "query-string";

import { emitResetError } from "redux/creators/errors";
import {
  EMIT_GETTING_STARTED_CARDS_SUCCESS,
  EMIT_SETS_SUCCESS,
  EMIT_SEARCHING_FOR_SET
} from "redux/actions/scryfall";

import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

export const requestGettingStartedCards = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  const queryParams = {
    type: "creature",
    subtype: "legendary",
    format: "modern",
    border: "black",
    language: "en"
  };

  const results = await Promise.all([
    scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["b"] })),
    scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["w"] })),
    scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["g"] })),
    scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["u"] })),
    scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["r"] }))
  ]);

  dispatch({
    type: EMIT_GETTING_STARTED_CARDS_SUCCESS,
    payload: { cards: results }
  });
};

export const requestGetSetByCode = (code: string) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch({
    type: EMIT_SEARCHING_FOR_SET,
    payload: { searching: true }
  });

  const result = await scryfallService.getSet(code);

  if (result.status === 404) {
    dispatch({
      type: EMIT_SETS_SUCCESS,
      payload: { sets: [] }
    });
  } else {
    dispatch({
      type: EMIT_SETS_SUCCESS,
      payload: { sets: [result] }
    });
  }

  dispatch({
    type: EMIT_SEARCHING_FOR_SET,
    payload: { searching: false }
  });
};
