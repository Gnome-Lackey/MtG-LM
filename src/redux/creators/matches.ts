import { EMIT_CREATE_MATCH_SUCCESS, EMIT_UPDATE_LOADING_MATCHES } from "redux/actions/match";

import { emitResetError, emitRequestError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";
import { requestGetSeason } from "redux/creators/seasons";

import * as matchService from "services/match";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

export const requestCreateMatch = (details: RecordMatchFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const body = {
    records: details.playerRecords.map((record) => ({
      player: record.player.key,
      wins: record.wins
    })),
    season: details.season.key
  };

  const data = await matchService.create(body);

  if (data && data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({ type: EMIT_CREATE_MATCH_SUCCESS });
    dispatch(requestGetSeason(details.season.key));
  }

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};
