import * as React from "react";
import { RouteComponentProps } from "react-router";

import PlayerRecordList from "components/Views/Home/PlayerRecordList";
import Fab from "components/Common/Fab";
import Modal from "components/Common/Modal";
import RecordMatchModalContent from "components/Views/Home/RecordMatch";
import SeasonSwitcher from "components/Views/Home/SeasonSwitcher";
import useDataFetch from "components/Hooks/useDataFetch";

import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/models/PlayerState";
import { Season } from "models/Season";

import "./styles.scss";

interface HomeViewActions {
  emitClearPlayerResultsForRecord: Function;
  emitToggleRecordMatchModal: Function;
  requestCreateMatch: Function;
  requestGetActiveSeasons: Function;
  requestGetCurrentSeason: Function;
  requestGetSeason: Function;
  requestQueryPlayersForRecordMatch: Function;
}

interface HomeViewProps extends RouteComponentProps {
  actions: HomeViewActions;
  isLoadingActiveSeasons: boolean;
  isLoadingCurrentSeason: boolean;
  isLoadingSeason: boolean;
  isMatchRequestLoading: boolean;
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
  selectedSeason: Season;
  showRecordMatchModal: boolean;
  user: User;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  actions,
  isLoadingActiveSeasons,
  isLoadingCurrentSeason,
  isLoadingSeason,
  isMatchRequestLoading,
  playerSearchResultsMap,
  seasons,
  selectedSeason,
  showRecordMatchModal,
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => {
  useDataFetch(!selectedSeason, actions.requestGetCurrentSeason);
  useDataFetch(!seasons.length, actions.requestGetActiveSeasons);

  const playerList = selectedSeason ? selectedSeason.players : [];
  const showListSpinner = isLoadingActiveSeasons || isLoadingCurrentSeason || isLoadingSeason;

  return (
    <div className="home-view">
      <div className="content">
        <SeasonSwitcher
          seasons={seasons}
          selectedSeason={selectedSeason}
          selectHandler={actions.requestGetSeason}
        />
        <PlayerRecordList isRequestLoading={showListSpinner} players={playerList} user={user} />
      </div>
      <Fab
        clickHandler={() => actions.emitToggleRecordMatchModal()}
        disabled={isLoadingSeason || isMatchRequestLoading}
      >
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
            selectedSeason={selectedSeason}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default HomeView;
