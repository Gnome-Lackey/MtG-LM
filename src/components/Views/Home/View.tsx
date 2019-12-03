import * as React from "react";
import { RouteComponentProps } from "react-router";

import Fab from "components/Common/Fab";
import Modal from "components/Common/Modal";
import RecordMatchModalContent from "components/Common/Modal/Content/RecordMatch";

import { User } from "models/User";
import { Player } from "models/Player";

import "./styles.scss";

interface HomeViewActions {
  emitClearPlayersForRecord: Function;
  emitToggleRecordMatchModal: Function;
  requestCreateMatch: Function;
  requestQueryPlayersForRecord: Function;
}

interface HomeViewProps extends RouteComponentProps {
  actions: HomeViewActions;
  isRequestLoading: boolean;
  potentialPlayerA: Player[];
  potentialPlayerB: Player[];
  searchingForAPlayers: boolean;
  searchingForBPlayers: boolean;
  showRecordMatchModal: boolean;
  user: User;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  actions,
  isRequestLoading,
  potentialPlayerA,
  potentialPlayerB,
  searchingForAPlayers,
  searchingForBPlayers,
  showRecordMatchModal,
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => (
  <div className="home-view">
    <p>Welcome {user.userName}! This site is under construction.</p>
    <Fab clickHandler={() => actions.emitToggleRecordMatchModal()}>
      <i className="fas fa-plus" />
    </Fab>
    {showRecordMatchModal ? (
      <Modal
        id="recordMatchModal"
        closeHandler={actions.emitToggleRecordMatchModal}
        title="Record Match"
        mask
      >
        <RecordMatchModalContent
          clearHandler={actions.emitClearPlayersForRecord}
          isRequestLoading={isRequestLoading}
          potentialAPlayers={potentialPlayerA}
          potentialBPlayers={potentialPlayerB}
          searchingForAPlayers={searchingForAPlayers}
          searchingForBPlayers={searchingForBPlayers}
          searchHandler={actions.requestQueryPlayersForRecord}
          submitHandler={actions.requestCreateMatch}
        />
      </Modal>
    ) : null}
  </div>
);

export default HomeView;
