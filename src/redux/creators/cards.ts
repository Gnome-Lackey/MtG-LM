import * as scryfallService from "services/scryfall";

import * as scryfallMapper from "mappers/scryfall";

import { emitResetError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";
import { EMIT_GETTING_STARTED_CARDS_SUCCESS } from "redux/actions/cards";

import { ScryfallCard } from "models/Scryfall";

import { REQUEST_GETTING_STARTED_CARDS } from "constants/request";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

const buildQueryString = (color: string, type: string): string =>
  `c=${color}+lang=en+t=${type}+border=black+-t=legendary+f=modern`;

const mapScryfallResultsToCards = (results: any[]): ScryfallCard[] =>
  results.map(
    (result): ScryfallCard => ({
      id: result.id,
      name: result.name,
      colors: result.colors,
      type: result.type_line,
      imageUris: result.image_uris
    })
  );

export const requestGettingStartedCards = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_CARDS, true));

  const results = await Promise.all([
    scryfallService.getCard(buildQueryString("w", "creature")),
    scryfallService.getCard(buildQueryString("b", "creature")),
    scryfallService.getCard(buildQueryString("g", "creature")),
    scryfallService.getCard(buildQueryString("u", "creature")),
    scryfallService.getCard(buildQueryString("r", "creature"))
  ]);

  const scryfallCards = mapScryfallResultsToCards(results);

  const cards = scryfallCards.map(scryfallMapper.toCard);

  dispatch({
    type: EMIT_GETTING_STARTED_CARDS_SUCCESS,
    payload: { cards }
  });

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_CARDS, false));
};