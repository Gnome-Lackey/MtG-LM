import * as React from "react";

import { Player } from "models/Player";
import { User } from "models/User";
import { SeasonMetadata } from "models/Season";

import PlayerRecordListItem from "components/Views/Home/PlayerRecordList/PlayerRecordListItem";
import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface PlayerRecordListProps {
  hasSeason: boolean;
  isRequestLoading: boolean;
  metadata: SeasonMetadata;
  players: Player[];
  showWarning?: boolean;
  user: User;
}

const renderContent = (
  isRequestLoading: boolean,
  hasSeason: boolean,
  metadata: SeasonMetadata,
  players: Player[],
  user: User
): JSX.Element | JSX.Element[] => {
  if (isRequestLoading) {
    return (
      <li className="record-spinner">
        <Spinner inline />
      </li>
    );
  } else if (hasSeason && !players.length) {
    return <li className="record-empty-message">There are no players in this season.</li>;
  } else if (players.length) {
    return players.map((player) => {
      const isLoggedInUser = user.id === player.id;
      const hasPlayedUser = metadata.playedOpponents.includes(user.id);
      const hasWinAgainstPlayer = metadata.matches.some(
        (match) => match.winner === user.id && match.losers.includes(player.id)
      );

      return (
        <PlayerRecordListItem
          key={player.id}
          hasPlayedUser={hasPlayedUser}
          isLoggedInUser={isLoggedInUser}
          hasWinAgainstPlayer={hasWinAgainstPlayer}
          player={player}
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
  hasSeason,
  isRequestLoading,
  metadata,
  players,
  showWarning,
  user
}: PlayerRecordListProps): React.FunctionComponentElement<PlayerRecordListProps> => (
  <ul className="player-record-list">
    <li className="record-headers">
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
    {renderContent(isRequestLoading, hasSeason, metadata, players, user)}
  </ul>
);

export default PlayerRecordList;
