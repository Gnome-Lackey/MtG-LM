import * as React from "react";

import { Player } from "models/Player";
import { SeasonMetadata } from "models/Season";

import PlayerRecordListItem from "components/Views/Home/PlayerRecordList/PlayerRecordListItem";
import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface PlayerRecordListProps {
  hasSeason: boolean;
  isRequestLoading: boolean;
  metadata: SeasonMetadata[];
  players: Player[];
  setCode: string;
  showWarning?: boolean;
  userMetadata: SeasonMetadata;
}

const renderContent = (
  isRequestLoading: boolean,
  hasSeason: boolean,
  setCode: string,
  metadata: SeasonMetadata[],
  players: Player[],
  userMetadata: SeasonMetadata
): JSX.Element | JSX.Element[] => {
  const noPlayersInSeason = hasSeason && !players.length;

  if (isRequestLoading) {
    return (
      <li className="record-spinner">
        <Spinner inline />
      </li>
    );
  } else if (noPlayersInSeason) {
    return <li className="record-empty-message">There are no players in this season.</li>;
  } else if (userMetadata) {
    return players.map((player) => {
      const playerMetadata = metadata.find((nextMetadata) => nextMetadata.player === player.id);

      return (
        <PlayerRecordListItem
          key={player.id}
          setCode={setCode}
          player={player}
          playerMetadata={playerMetadata}
          userMetadata={userMetadata}
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
  setCode,
  showWarning,
  userMetadata
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
    {renderContent(isRequestLoading, hasSeason, setCode, metadata, players, userMetadata)}
  </ul>
);

export default PlayerRecordList;
