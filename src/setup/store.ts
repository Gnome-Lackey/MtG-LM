import { applyMiddleware, createStore, AnyAction, Store, Middleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReducer from "redux/reducers";
import { RootState } from "redux/models/RootState";

import history from "setup/history";

const middleware: Middleware[] = [routerMiddleware(history), thunk];

const store: Store<RootState, AnyAction> = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
