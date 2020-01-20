import { emitResetError } from "redux/creators/errors";
import { requestGetPlayers } from "redux/creators/players";

import * as matchService from "services/match";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

import { DOMAIN_ERROR_RECORD_MATCH, VIEW_ERROR_MATCH_CREATE } from "constants/errors";
import { EMIT_CREATE_MATCH_SUCCESS, EMIT_UPDATE_LOADING_MATCHES } from "redux/actions/match";
import { emitRequestLoading } from "./application";

export const requestCreateMatch = (details: RecordMatchFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_RECORD_MATCH, VIEW_ERROR_MATCH_CREATE));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const body = {
    records: details.playerRecords.map((record) => ({
      player: record.player.key,
      wins: record.wins
    })),
    season: "TODO: Replace with id of real season."
  };

  await matchService.create(body);

  dispatch({
    type: EMIT_CREATE_MATCH_SUCCESS
  });

  dispatch(requestGetPlayers(true));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};
