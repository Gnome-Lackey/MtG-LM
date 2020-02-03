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

const PlayerRecordList: React.FunctionComponent<PlayerRecordListProps> = ({
  hasSeason,
  isRequestLoading,
  players,
  showWarning,
  user
}: PlayerRecordListProps): React.FunctionComponentElement<PlayerRecordListProps> => {
  let content: JSX.Element | JSX.Element[] = (
    <li className="record-empty-message">There are no players in this season.</li>
  );

  if (isRequestLoading) {
    content = (
      <li className="record-spinner">
        <Spinner inline />
      </li>
    );
  } else if (!hasSeason) {
    content = (
      <li className="record-empty-message">
        There are no active seasons. Please contact an admin to get a season started.
      </li>
    );
  } else if (players.length) {
    content = players.map((player) => (
      <PlayerRecordListItem key={player.id} player={player} userId={user && user.id} />
    ));
  }

  return (
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
      {content}
    </ul>
  );
};

export default PlayerRecordList;
