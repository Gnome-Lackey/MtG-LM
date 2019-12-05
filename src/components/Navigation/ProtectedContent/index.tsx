import * as React from "react";

import Spinner from "components/Common/Spinner";
import useAuth from "components/Hooks/useAuth";

import { User } from "models/User";

import { ACCOUNT_TYPE_ADMIN } from "constants/accountTypes";

import "./styles.scss";

interface ProtectedContentProps {
  admin?: boolean;
  children: React.FunctionComponent<any>;
  redirectHandler: Function;
  user?: User;
  validated: boolean;
  validationHandler: Function;
}

const renderContent = (
  admin: boolean,
  accountType: string,
  isValidated: boolean,
  children: React.FunctionComponent<any>
  ): React.FunctionComponentElement<any> | React.FunctionComponent<any> => {
    if (admin && accountType !== ACCOUNT_TYPE_ADMIN) {
    return (
      <div className="msg-unauthorized">
        <p>Woah there buddy! You need the proper privileges to enter here. I&pos;m going to have to ask you to planeswalk away.</p>
      </div>
    );
  } else if (isValidated) {
    return children;
  } else {
    return <Spinner />;
  }
};

const ProtectedContent = ({
  admin,
  children,
  redirectHandler,
  user,
  validated,
  validationHandler
}: ProtectedContentProps): React.FunctionComponentElement<ProtectedContentProps> => {
  const isValidated = useAuth(validated, validationHandler, redirectHandler);

  return (
    <div className="protected-content">
      {renderContent(admin, user.accountType, isValidated, children)}
    </div>
  );
};

export default ProtectedContent;
