import * as scryfallService from "services/scryfall";

import * as scryfallMapper from "mappers/scryfall";

import { emitResetError } from "redux/creators/errors";
import {
  EMIT_GETTING_STARTED_CARDS_SUCCESS,
  EMIT_SETS_SUCCESS,
  EMIT_SEARCHING_FOR_SET
} from "redux/actions/scryfall";

import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

export const requestGettingStartedCards = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  const results = await Promise.all([
    scryfallService.getCard(scryfallMapper.toCardQueryString("w", "creature")),
    scryfallService.getCard(scryfallMapper.toCardQueryString("b", "creature")),
    scryfallService.getCard(scryfallMapper.toCardQueryString("g", "creature")),
    scryfallService.getCard(scryfallMapper.toCardQueryString("u", "creature")),
    scryfallService.getCard(scryfallMapper.toCardQueryString("r", "creature"))
  ]);

  const scryfallCards = results.map(scryfallMapper.toScryfallCard);
  const cards = scryfallCards.map(scryfallMapper.toCard);

  dispatch({
    type: EMIT_GETTING_STARTED_CARDS_SUCCESS,
    payload: { cards }
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
      payload: { set: null }
    });
  } else {
    const scryfallSet = scryfallMapper.toScryfallSet(result);
    const set = scryfallMapper.toSet(scryfallSet);

    dispatch({
      type: EMIT_SETS_SUCCESS,
      payload: { set }
    });
  }

  dispatch({
    type: EMIT_SEARCHING_FOR_SET,
    payload: { searching: false }
  });
};
