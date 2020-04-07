import * as queryString from "query-string";

import {
  EMIT_GETTING_STARTED_CARDS_SUCCESS,
  EMIT_SETS_SUCCESS,
  EMIT_SEARCHING_FOR_SET
} from "redux/scryfall/actions";

import ScryfallService from "services/scryfall";

export default class ScryfallCreator {
  private scryfallService = new ScryfallService();

  requestGettingStartedCards = () => {
    return async (dispatch: Function) => {
      const queryParams = {
        type: "creature",
        subtype: "legendary",
        format: "modern",
        border: "black",
        language: "en"
      };

      const results = await Promise.all([
        this.scryfallService.getRandomCard(
          queryString.stringify({ ...queryParams, colors: ["b"] })
        ),
        this.scryfallService.getRandomCard(
          queryString.stringify({ ...queryParams, colors: ["w"] })
        ),
        this.scryfallService.getRandomCard(
          queryString.stringify({ ...queryParams, colors: ["g"] })
        ),
        this.scryfallService.getRandomCard(
          queryString.stringify({ ...queryParams, colors: ["u"] })
        ),
        this.scryfallService.getRandomCard(queryString.stringify({ ...queryParams, colors: ["r"] }))
      ]);

      dispatch({
        type: EMIT_GETTING_STARTED_CARDS_SUCCESS,
        payload: { cards: results }
      });
    };
  };

  requestGetSetByCode = (code: string) => {
    return async (dispatch: Function) => {
      dispatch({
        type: EMIT_SEARCHING_FOR_SET,
        payload: { searching: true }
      });

      const result = await this.scryfallService.getSet(code);

      dispatch({
        type: EMIT_SETS_SUCCESS,
        payload: { sets: result.error ? [] : [result] }
      });

      dispatch({
        type: EMIT_SEARCHING_FOR_SET,
        payload: { searching: false }
      });
    };
  };
}
