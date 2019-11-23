import { combineReducers, Reducer, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import applicationReducer from "redux/reducers/application";
import authReducer from "redux/reducers/auth";
import cardReducer from "redux/reducers/card";
import errorsReducer from "redux/reducers/errors";
import usersReducer from "redux/reducers/users";

import { RootState } from "redux/models/RootState";

export default (history: History): Reducer<RootState, AnyAction> =>
  combineReducers({
    application: applicationReducer,
    auth: authReducer,
    card: cardReducer,
    errors: errorsReducer,
    users: usersReducer,
    router: connectRouter(history)
  });
