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
import { MatchRecordMap } from "models/Match";

import { ACCOUNT_TYPE_ADMIN } from "constants/accountTypes";

import "./styles.scss";

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
  selectedSeason,
  showRecordMatchModal,
  user
}: HomeViewProps): React.FunctionComponentElement<HomeViewProps> => {
  useDataFetch(!selectedSeason, actions.requestGetCurrentSeason);
  useDataFetch(!seasons.length, actions.requestGetActiveSeasons);
  useDataFetch(selectedSeason && !matchRecords, () =>
    actions.requestMatchesBySeasonAndPlayer(selectedSeason.id, selectedSeason.players)
  );

  const playerList = selectedSeason ? selectedSeason.players : [];
  const setCode = selectedSeason ? selectedSeason.set.code : "";
  const isAdminUser = user.accountType === ACCOUNT_TYPE_ADMIN;
  const isCurrentUserInSeason = isAdminUser 
    || !playerList.length 
    || !!playerList.find(({ id }) => id === user.id);

  const isPageLoading = isLoadingActiveSeasons 
    || isLoadingCurrentSeason 
    || isLoadingSeason 
    || isLoadingMatches;

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
          hasSeason={!!selectedSeason}
          isRequestLoading={isPageLoading}
          matchRecords={matchRecords}
          players={playerList}
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
