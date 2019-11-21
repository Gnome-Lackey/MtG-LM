import * as React from "react";
import { RouteComponentProps } from "react-router";

import { User } from "models/User";

import "./styles.scss";

interface HomeViewProps extends RouteComponentProps {
  actions: {};
  user: User;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => (
  <div className="home-view">
    <p>
      Welcome {user.userName}! This site is under construction.
    </p>
  </div>
);

export default HomeView;
