import * as React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import NavigationContainer from "components/Navigation/Container";
import Spinner from "components/Common/Spinner";

import history from "setup/history";
import store from "setup/store";

import { ROUTES } from "constants/routes";

import "styles/_global.scss";

const { lazy, Suspense } = React;

const LoginContainer: React.LazyExoticComponent<any> = lazy(() =>
  import("components/Views/Login/Container")
);

const HomeContainer: React.LazyExoticComponent<any> = lazy(() =>
  import("components/Views/Home/Container")
);

const SignUpContainer: React.LazyExoticComponent<any> = lazy(() =>
  import("components/Views/SignUp/Container")
);

const VerifyContainer: React.LazyExoticComponent<any> = lazy(() =>
  import("components/Views/Verify/Container")
);

/*
  NOTE: Passing store as any is a work-around for a bug with Provider and TypeScript. 
        See https://github.com/reduxjs/redux/issues/2709
*/
const Routes = (): React.FunctionComponentElement<void> => (
  <Provider store={store as any}>
    <ConnectedRouter history={history}>
      <NavigationContainer>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path={ROUTES.ROOT} component={LoginContainer} />
            <Route exact path={ROUTES.SIGN_UP_PAGE} component={SignUpContainer} />
            <Route exact path={ROUTES.VERIFICATION_PAGE} component={VerifyContainer} />
            <Route exact path={ROUTES.HOME_PAGE} component={HomeContainer} />
          </Switch>
        </Suspense>
      </NavigationContainer>
    </ConnectedRouter>
  </Provider>
);

export default Routes;
