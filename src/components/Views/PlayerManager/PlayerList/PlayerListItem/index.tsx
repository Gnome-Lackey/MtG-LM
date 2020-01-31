import * as React from "react";
import * as classNames from "classnames";

import { PlayerDetails } from "models/Player";

import "./styles.scss";

interface PlayerListItemProps {
  deselectHandler: Function;
  selectHandler: Function;
  selectedPlayer: PlayerDetails;
  player: PlayerDetails;
}

const PlayerListItem = ({
  deselectHandler,
  selectHandler,
  selectedPlayer,
  player
}: PlayerListItemProps): React.FunctionComponentElement<PlayerListItemProps> => {
  const handleSelectPlayer = (selected: PlayerDetails): void => {
    const isSelected = selectedPlayer && selectedPlayer.id === selected.id;

    if (isSelected) {
      deselectHandler();
    } else {
      selectHandler(selected);
    }
  };

  const isSelected = selectedPlayer && selectedPlayer.id === player.id;

  return (
    <li key={player.id} className={classNames("player-list-item", { selected: isSelected })}>
      <button
        type="button"
        className="btn-player"
        onClick={() => {
          handleSelectPlayer(player);
        }}
      >
        <div className="player-description">
          <p className="player-user-name">
            <i className="fas fa-user" />
            {player.userName}
          </p>
          {player.isAdmin ? (
            <div className="indicator-container">
              <div className="indicator" />
            </div>
          ) : null}
        </div>
        <p className="player-display-name">{`${player.displayName} - ${player.epithet}`}</p>
      </button>
    </li>
  );
};

export default PlayerListItem;
