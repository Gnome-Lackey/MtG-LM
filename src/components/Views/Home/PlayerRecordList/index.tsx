import * as React from "react";

import { Player } from "models/Player";
import { MatchRecordMap } from "models/Match";
import { User } from "models/User";

import PlayerRecordListItem from "components/Views/Home/PlayerRecordList/PlayerRecordListItem";
import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface PlayerRecordListProps {
  isRequestLoading: boolean;
  matchRecords: MatchRecordMap;
  players: Player[];
  setCode: string;
  showWarning?: boolean;
  user: User;
}

const renderContent = (
  isRequestLoading: boolean,
  matchRecords: MatchRecordMap,
  players: Player[],
  setCode: string,
  user: User
): JSX.Element | JSX.Element[] => {
  const noPlayersInSeason = !players.length;

  if (isRequestLoading) {
    return (
      <li className="record-spinner">
        <Spinner inline />
      </li>
    );
  } else if (noPlayersInSeason) {
    return <li className="record-empty-message">There are no players in this season.</li>;
  } else if (matchRecords) {
    return players.map((player) => {
      const isLoggedInUser = user.id === player.id;
      const playerRecord = matchRecords[player.id];
      const loggedInUserRecord = matchRecords[user.id];

      return (
        <PlayerRecordListItem
          key={player.id}
          isLoggedInUser={isLoggedInUser}
          loggedInUserRecord={loggedInUserRecord}
          player={player}
          playerRecord={playerRecord}
          setCode={setCode}
        />
      );
    });
  }

  return (
    <li className="record-empty-message">
      There are no active seasons. Please contact an admin to get a season started.
    </li>
  );
};

const PlayerRecordList: React.FunctionComponent<PlayerRecordListProps> = ({
  isRequestLoading,
  matchRecords,
  players,
  setCode,
  showWarning,
  user
}: PlayerRecordListProps): React.FunctionComponentElement<PlayerRecordListProps> => (
  <ul className="player-record-list">
    <li className="record-headers">
      <p className="rank">
        <i className="fas fa-list-ol" />
      </p>
      <p className="header name">Player Name</p>
      <p className="header wins">Total Wins</p>
      <p className="header losses">Total Losses</p>
    </li>
    {showWarning ? (
      <li>
        <p className="not-in-season-message">
          You are currently not in this season. Please contact an admin to be added.
        </p>
      </li>
    ) : null}
    {renderContent(isRequestLoading, matchRecords, players, setCode, user)}
  </ul>
);

export default PlayerRecordList;
