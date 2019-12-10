import { emitResetError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";
import { requestGetPlayers } from "redux/creators/players";

import * as matchService from "services/match";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

import { REQUEST_RECORD_MATCH } from "constants/request";
import { DOMAIN_ERROR_RECORD_MATCH, VIEW_ERROR_MATCH_CREATE } from "constants/errors";
import { EMIT_CREATE_MATCH_SUCCESS } from "redux/actions/match";

export const requestCreateMatch = (details: RecordMatchFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_RECORD_MATCH, VIEW_ERROR_MATCH_CREATE));

  dispatch(emitRequestLoading(REQUEST_RECORD_MATCH, true));

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

  dispatch(requestGetPlayers());

  dispatch(emitRequestLoading(REQUEST_RECORD_MATCH, false));
};
