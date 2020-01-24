import * as React from "react";
import { RouteComponentProps } from "react-router";

import PlayerRecordList from "components/Views/Home/PlayerRecordList";
import Fab from "components/Common/Fab";
import Dropdown from "components/Form/Dropdown";
import Modal from "components/Common/Modal";
import RecordMatchModalContent from "components/Views/Home/RecordMatch";
import useDataFetch from "components/Hooks/useDataFetch";

import * as seasonMapper from "mappers/seasons";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { Player } from "models/Player";
import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/models/PlayerState";
import { Season } from "models/Season";

import "./styles.scss";

interface HomeViewActions {
  emitClearPlayerResultsForRecord: Function;
  emitToggleRecordMatchModal: Function;
  requestCreateMatch: Function;
  requestGetActiveSeasons: Function;
  requestGetPlayers: Function;
  requestQueryPlayersForRecordMatch: Function;
}

interface HomeViewProps extends RouteComponentProps {
  actions: HomeViewActions;
  areRecordsLoading: boolean;
  isMatchRequestLoading: boolean;
  players: Player[];
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
  showRecordMatchModal: boolean;
  user: User;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  actions,
  areRecordsLoading,
  isMatchRequestLoading,
  players,
  playerSearchResultsMap,
  seasons,
  showRecordMatchModal,
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => {
  useDataFetch(!players.length, actions.requestGetPlayers);
  useDataFetch(!seasons.length, actions.requestGetActiveSeasons);

  return (
    <div className="home-view">
      <div className="content">
        <Dropdown
          className="season-switcher"
          selectHandler={(value: DropdownOption) => {
            console.log(value.label);
          }}
          options={seasons.map(seasonMapper.toOption)}
          placeholder="Select match season..."
        />
        <PlayerRecordList isRequestLoading={areRecordsLoading} players={players} user={user} />
      </div>
      <Fab clickHandler={() => actions.emitToggleRecordMatchModal()}>
        <i className="fas fa-plus" />
      </Fab>
      {showRecordMatchModal ? (
        <Modal
          id="recordMatchModal"
          closeHandler={actions.emitToggleRecordMatchModal}
          title="Record Match"
          mask
          grow
        >
          <RecordMatchModalContent
            activeSeasons={seasons}
            clearHandler={actions.emitClearPlayerResultsForRecord}
            isRequestLoading={isMatchRequestLoading}
            playerSearchResultsMap={playerSearchResultsMap}
            searchHandler={actions.requestQueryPlayersForRecordMatch}
            submitHandler={actions.requestCreateMatch}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default HomeView;
