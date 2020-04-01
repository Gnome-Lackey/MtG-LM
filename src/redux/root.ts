import { combineReducers, Reducer, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import applicationReducer from "redux/application/reducer";
import authReducer from "redux/auth/creators";
import cardReducer from "redux/scryfall/reducer";
import errorsReducer from "redux/error/reducer";
import matchReducer from "redux/match/reducer";
import playerReducer from "redux/player/reducer";
import seasonReducer from "redux/season/reducer";
import usersReducer from "redux/user/reducer";

import { RootState } from "redux/models/RootState";

export default (history: History): Reducer<RootState, AnyAction> =>
  combineReducers({
    application: applicationReducer,
    auth: authReducer,
    errors: errorsReducer,
    matches: matchReducer,
    players: playerReducer,
    scryfall: cardReducer,
    seasons: seasonReducer,
    users: usersReducer,
    router: connectRouter(history)
  });
