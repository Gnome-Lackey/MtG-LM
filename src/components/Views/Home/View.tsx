import * as React from "react";
import { RouteComponentProps } from "react-router";

import Fab from "components/Common/Fab";
import Modal from "components/Common/Modal";
import RecordMatchModalContent from "components/Common/Modal/Content/RecordMatch";
import useDataFetch from "components/Hooks/useDataFetch";

import { Player } from "models/Player";

import "./styles.scss";

interface HomeViewActions {
  emitClearPlayersForRecord: Function;
  emitToggleRecordMatchModal: Function;
  requestCreateMatch: Function;
  requestGetPlayers: Function;
  requestQueryPlayersForRecord: Function;
}

interface HomeViewProps extends RouteComponentProps {
  actions: HomeViewActions;
  isRequestLoading: boolean;
  players: Player[];
  potentialPlayerA: Player[];
  potentialPlayerB: Player[];
  searchingForAPlayers: boolean;
  searchingForBPlayers: boolean;
  showRecordMatchModal: boolean;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  actions,
  isRequestLoading,
  players,
  potentialPlayerA,
  potentialPlayerB,
  searchingForAPlayers,
  searchingForBPlayers,
  showRecordMatchModal
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => {
  useDataFetch(!!players.length, actions.requestGetPlayers);

  return (
    <div className="home-view">
      <ul className="player-record-list">
        <li className="player-record">
          <p className="header name">
            Player Name
          </p>
          <p className="header wins">Total Wins</p>
          <p className="header losses">Total Losses</p>
        </li>
        {players.map((player) => (
          <li key={player.id} className="player-record">
            <p className="name">
              {player.displayName}&nbsp;
              <span className="small">({player.userName})</span>
            </p>
            <p className="wins">{player.totalWins}</p>
            <p className="losses">{player.totalLosses}</p>
          </li>
        ))}
      </ul>
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
};

export default HomeView;
