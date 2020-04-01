import * as React from "react";
import { RouteComponentProps } from "react-router";

import PlayerRecordList from "components/Views/Home/PlayerRecordList";
import Fab from "components/Common/Fab";
import Modal from "components/Common/Modal";
import RecordMatchModalContent from "components/Views/Home/RecordMatch";
import SeasonSwitcher from "components/Views/Home/SeasonSwitcher";
import useDataFetch from "components/Hooks/useDataFetch";

import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/player/models/State";
import { Season } from "models/Season";
import { MatchRecordMap } from "models/Match";

import { ACCOUNT_TYPE_ADMIN } from "constants/accountTypes";

import "./styles.scss";
import { Player } from "models/Player";

interface HomeViewActions {
  emitClearPlayerResultsForRecord: Function;
  emitToggleRecordMatchModal: Function;
  requestCreateMatch: Function;
  requestGetActiveSeasons: Function;
  requestGetCurrentSeason: Function;
  requestGetSeason: Function;
  requestMatchesBySeasonAndPlayer: Function;
  requestQueryPlayersForRecordMatch: Function;
}

interface HomeViewProps extends RouteComponentProps {
  actions: HomeViewActions;
  isLoadingSeason: boolean;
  isLoadingActiveSeasons: boolean;
  isLoadingCurrentSeason: boolean;
  isLoadingMatchCreation: boolean;
  isLoadingMatches: boolean;
  matchRecords: MatchRecordMap;
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
  selectedPlayers: Player[];
  selectedSeason: Season;
  showRecordMatchModal: boolean;
  user: User;
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({
  actions,
  isLoadingSeason,
  isLoadingActiveSeasons,
  isLoadingCurrentSeason,
  isLoadingMatchCreation,
  isLoadingMatches,
  matchRecords,
  playerSearchResultsMap,
  seasons,
  selectedPlayers,
  selectedSeason,
  showRecordMatchModal,
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => {
  useDataFetch(!selectedSeason, actions.requestGetCurrentSeason);
  useDataFetch(!seasons.length, actions.requestGetActiveSeasons);
  useDataFetch(
    selectedSeason && selectedPlayers.length && !matchRecords, 
    () => actions.requestMatchesBySeasonAndPlayer(selectedSeason.id, selectedPlayers)
  );

  const setCode = selectedSeason ? selectedSeason.set.code : "";
  
  const isAdminUser = user.accountType === ACCOUNT_TYPE_ADMIN;
  const isCurrentUserInSeason = isAdminUser || !selectedPlayers.length || !!selectedPlayers.find(({ id }) => id === user.id);
  const isPageLoading = isLoadingActiveSeasons || isLoadingCurrentSeason || isLoadingSeason || isLoadingMatches;
  const isFabDisabled = isPageLoading || isLoadingMatchCreation || !isCurrentUserInSeason;

  return (
    <div className="home-view">
      <div className="content">
        <SeasonSwitcher
          seasons={seasons}
          selectedSeason={selectedSeason}
          selectHandler={actions.requestGetSeason}
        />
        <PlayerRecordList
          isRequestLoading={isPageLoading}
          matchRecords={matchRecords}
          players={selectedPlayers}
          setCode={setCode}
          showWarning={!isCurrentUserInSeason}
          user={user}
        />
      </div>
      <Fab clickHandler={() => actions.emitToggleRecordMatchModal()} disabled={isFabDisabled}>
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
            isRequestLoading={isLoadingMatchCreation}
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
