import * as scryfallService from "services/scryfall";

import * as scryfallMapper from "mappers/scryfall";

import { emitResetError } from "redux/creators/error";
import { emitRequestLoading } from "redux/creators/application";
import { EMIT_GETTING_STARTED_CARDS_SUCCESS } from "redux/actions/card";

import { ScryfallCard } from "models/Scryfall";

import { REQUEST_GETTING_STARTED_CARDS } from "constants/request";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

const buildQueryString = (color: string, type: string): string => `c=${color}+lang=en+t=${type}`;

export const requestGettingStartedCards = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_CARDS, true));

  const promises = await Promise.all([
    scryfallService.getCard(buildQueryString("w", "creature")),
    scryfallService.getCard(buildQueryString("b", "creature")),
    scryfallService.getCard(buildQueryString("g", "creature")),
    scryfallService.getCard(buildQueryString("u", "creature")),
    scryfallService.getCard(buildQueryString("r", "creature"))
  ]);

  // TODO: Move this to a mapper
  const scryfallCards = promises.map(
    (promise): ScryfallCard => ({
      id: promise.data.id,
      name: promise.data.name,
      colors: promise.data.colors,
      "image_uris": promise.data.image_uris
    })
  );

  const cards = scryfallCards.map(scryfallMapper.toCard);

  dispatch({
    type: EMIT_GETTING_STARTED_CARDS_SUCCESS,
    paylaod: { cards }
  });

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_CARDS, false));
};
