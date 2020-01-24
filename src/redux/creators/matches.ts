import { EMIT_CREATE_MATCH_SUCCESS, EMIT_UPDATE_LOADING_MATCHES } from "redux/actions/match";

import { emitResetError, emitRequestError } from "redux/creators/errors";
import { requestGetPlayers } from "redux/creators/players";
import { emitRequestLoading } from "redux/creators/application";

import * as matchService from "services/match";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

import { DOMAIN_ERROR_FORM_RECORD_MATCH, VIEW_ERROR_FORM_MATCH } from "constants/errors";

export const requestCreateMatch = (details: RecordMatchFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_FORM_RECORD_MATCH, VIEW_ERROR_FORM_MATCH));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const body = {
    records: details.playerRecords.map((record) => ({
      player: record.player.key,
      wins: record.wins
    })),
    season: details.season.key
  };

  const data = await matchService.create(body);

  if (data.error) {
    dispatch(
      emitRequestError(DOMAIN_ERROR_FORM_RECORD_MATCH, VIEW_ERROR_FORM_MATCH, data.error.message)
    );
  } else {
    dispatch({
      type: EMIT_CREATE_MATCH_SUCCESS
    });

    dispatch(requestGetPlayers(true));
  }

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};
