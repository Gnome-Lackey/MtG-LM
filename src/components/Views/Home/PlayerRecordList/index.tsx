import * as React from "react";

import { Player } from "models/Player";
import { User } from "models/User";

import PlayerRecordListItem from "components/Views/Home/PlayerRecordList/PlayerRecordListItem";
import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface PlayerRecordListProps {
  hasSeason: boolean;
  isRequestLoading: boolean;
  players: Player[];
  showWarning?: boolean;
  user: User;
}

const renderContent = (
  isRequestLoading: boolean,
  hasSeason: boolean,
  players: Player[],
  user: User
): JSX.Element | JSX.Element[] => {
  if (isRequestLoading) {
    return (
      <li className="record-spinner">
        <Spinner inline />
      </li>
    );
  } else if (!hasSeason) {
    return (
      <li className="record-empty-message">
        There are no active seasons. Please contact an admin to get a season started.
      </li>
    );
  } else if (players.length) {
    return players.map((player) => (
      <PlayerRecordListItem key={player.id} player={player} userId={user && user.id} />
    ));
  }

  return <li className="record-empty-message">There are no players in this season.</li>;
};

const PlayerRecordList: React.FunctionComponent<PlayerRecordListProps> = ({
  hasSeason,
  isRequestLoading,
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
    {renderContent(hasSeason, isRequestLoading, players, user)}
  </ul>
);

export default PlayerRecordList;
