import { combineReducers, Reducer, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import applicationReducer from "redux/reducers/application";
import authReducer from "redux/reducers/auth";
import cardReducer from "redux/reducers/scryfall";
import errorsReducer from "redux/reducers/errors";
import playerReducer from "redux/reducers/players";
import seasonReducer from "redux/reducers/seasons";
import usersReducer from "redux/reducers/users";

import { RootState } from "redux/models/RootState";

export default (history: History): Reducer<RootState, AnyAction> =>
  combineReducers({
    application: applicationReducer,
    auth: authReducer,
    scryfall: cardReducer,
    seasons: seasonReducer,
    errors: errorsReducer,
    players: playerReducer,
    users: usersReducer,
    router: connectRouter(history)
  });
