import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import Mask from "components/Common/Mask";
import Snackbar from "components/Common/SnackBar";
import Footer from "components/Navigation/Footer";
import Header from "components/Navigation/Header";
import ProtectedContent from "components/Navigation/ProtectedContent";

import useErrorMessage from "components/Hooks/useErrorMessage";

import { ErrorState } from "redux/models/ErrorState";
import { User } from "models/User";

import { USER_ROUTES, ADMIN_ROUTES, CONTAINER_ROUTES } from "constants/routes";
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

interface NavigationViewActions {
  emitResetError: Function;
  requestLogout: React.MouseEventHandler<HTMLButtonElement>;
  requestValidation: Function;
}

interface NavigationViewProps {
  actions: NavigationViewActions;
  children: React.FunctionComponent<any>;
  errors: ErrorState;
  loggingOut: boolean;
  showMask: boolean;
  user: User;
  validated: boolean;
}

const NavigationView = ({
  actions,
  children,
  errors,
  loggingOut,
  showMask,
  user,
  validated
}: NavigationViewProps): React.FunctionComponentElement<NavigationViewProps> => {
  const errorMessage = useErrorMessage(
    DOMAIN_ERROR_GENERAL,
    VIEW_ERROR_GENERAL,
    errors,
    actions.emitResetError
  );

  const hasError = !!errorMessage;

  const handleSnackbarClose = (): void => {
    actions.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL);
  };

  return (
    <div className="navigation">
      <Route
        path={CONTAINER_ROUTES}
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
      <Route path={CONTAINER_ROUTES} component={Footer} />
      <Snackbar show={hasError} closeHandler={handleSnackbarClose}>
        {errorMessage}
      </Snackbar>
      <Mask show={showMask} />
    </div>
  );
};

export default NavigationView;
