import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import Mask from "components/Common/Mask";
import Footer from "components/Navigation/Footer";
import Header from "components/Navigation/Header";
import ProtectedContent from "components/Navigation/ProtectedContent";

import { User } from "models/User";

import { USER_ROUTES, ADMIN_ROUTES, LOGGED_IN_ROUTES } from "constants/routes";

interface NavigationViewActions {
  requestLogout: React.MouseEventHandler<HTMLButtonElement>;
  requestValidation: Function;
}

interface NavigationViewProps {
  actions: NavigationViewActions;
  children: React.FunctionComponent<any>;
  loggingOut: boolean;
  showMask: boolean;
  user: User;
  validated: boolean;
}

const NavigationView = ({
  actions,
  children,
  loggingOut,
  showMask,
  user,
  validated
}: NavigationViewProps): React.FunctionComponentElement<NavigationViewProps> => (
  <React.Fragment>
    <Route
      path={LOGGED_IN_ROUTES}
      render={(props: RouteComponentProps) => (
        <Header
          history={props.history}
          loggingOut={loggingOut}
          logoutHandler={actions.requestLogout}
          user={user}
        />
      )}
    />
    <Switch>
      <Route
        path={USER_ROUTES}
        render={(routerProps: RouteComponentProps) => (
          <ProtectedContent
            redirectHandler={routerProps.history.push}
            validationHandler={actions.requestValidation}
            validated={validated}
          >
            {children}
          </ProtectedContent>
        )}
      />
      <Route
        path={ADMIN_ROUTES}
        render={(routerProps: RouteComponentProps) => (
          <ProtectedContent
            admin
            redirectHandler={routerProps.history.push}
            validationHandler={actions.requestValidation}
            validated={validated}
            user={user}
          >
            {children}
          </ProtectedContent>
        )}
      />
      <Route render={() => children} />
    </Switch>
    <Route path={LOGGED_IN_ROUTES} component={Footer} />
    <Mask show={showMask} />
  </React.Fragment>
);

export default NavigationView;
