import * as React from "react";
import * as classNames from "classnames";

import { MatchRecord } from "models/Match";
import { Player } from "models/Player";

import "./styles.scss";

interface PlayerRecordListItemProps {
  isLoggedInUser: boolean;
  loggedInUserRecord: MatchRecord;
  player: Player;
  playerRecord: MatchRecord;
  setCode: string;
}

const renderIcon = (
  isLoggedInUser: boolean,
  hasPlayedUser: boolean,
  hasWinAgainstPlayer: boolean
): JSX.Element => {
  if (isLoggedInUser || !hasPlayedUser) {
    return null;
  } else if (hasWinAgainstPlayer) {
    return <i className="match-status-icon fas fa-trophy" />;
  }

  return <i className="match-status-icon fas fa-skull" />;
};

const renderListItem = (
  player: Player,
  setCode: string,
  isLoggedInUser: boolean,
  wins?: number,
  losses?: number,
  hasPlayedUser?: boolean,
  hasWinAgainstPlayer?: boolean
): JSX.Element => (
  <li
    className={classNames("player-record", {
      user: isLoggedInUser,
      win: hasWinAgainstPlayer,
      loss: !hasWinAgainstPlayer
    })}
  >
    <i className={`set-icon ss ss-${setCode}`} />
    {renderIcon(isLoggedInUser, hasPlayedUser, hasWinAgainstPlayer)}
    <p className={classNames("name", { unplayed: !hasPlayedUser })}>
      {player.displayName}
      <span className="small">
        ({player.epithet} / {player.userName})
      </span>
    </p>
    <p className="wins">{wins || 0}</p>
    <p className="losses">{losses || 0}</p>
  </li>
);

const PlayerRecordListItem: React.FunctionComponent<PlayerRecordListItemProps> = ({
  isLoggedInUser,
  loggedInUserRecord,
  player,
  playerRecord,
  setCode
}: PlayerRecordListItemProps): React.FunctionComponentElement<PlayerRecordListItemProps> => {
  if (loggedInUserRecord && playerRecord) {
    const hasPlayedUser = !isLoggedInUser && loggedInUserRecord.playersPlayed.includes(playerRecord.id);
    const hasWinAgainstPlayer = hasPlayedUser && loggedInUserRecord.opponentsDefeated.includes(playerRecord.id);
  
    return renderListItem(
      player,
      setCode,
      isLoggedInUser,
      playerRecord.wins,
      playerRecord.losses,
      hasPlayedUser,
      hasWinAgainstPlayer
    );
  } else if (!loggedInUserRecord && playerRecord) {
    return renderListItem(
      player,
      setCode,
      isLoggedInUser,
      playerRecord.wins,
      playerRecord.losses,
      false
    );
  }

  return renderListItem(player, setCode, isLoggedInUser);
};

export default PlayerRecordListItem;
