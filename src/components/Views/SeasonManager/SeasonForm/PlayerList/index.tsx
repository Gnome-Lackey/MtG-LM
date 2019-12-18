import * as React from "react";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";

import * as playerMapper from "mappers/players";

import { Player } from "models/Player";

import "./styles.scss";

interface PlayerListProps {
  players: TypeAheadOption[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchPlayerHandler: Function;
  updateValues: Function;
}

const PlayerList = ({
  players,
  potentialPlayers,
  searchForPlayer,
  searchPlayerHandler,
  updateValues
}: PlayerListProps): React.FunctionComponentElement<PlayerListProps> => {
  const playerOptions = potentialPlayers
    ? potentialPlayers.reduce((options, potentialPlayer) => {
        if (!players.some((player) => player.key === potentialPlayer.id)) {
          options.push(playerMapper.toOption(potentialPlayer));
        }

        return options;
      }, [])
    : [];

  const handleRemovePlayer = (key: string): void => {
    const updatedPlayers = players.filter((player) => player.key !== key);

    updateValues("players", updatedPlayers);
  };

  return (
    <div className="season-players">
      <TypeAhead
        autoSubmit
        id="players"
        isSearching={searchForPlayer}
        label="Season Players"
        options={playerOptions}
        searchHandler={searchPlayerHandler}
        selectHandler={(option: TypeAheadOption) => {
          updateValues("players", [...players, option]);
        }}
      />
      <ul className="player-list">
        {players.map((playerOption) => (
          <li key={playerOption.key} className="player-list-item">
            <p className="player-name">{playerOption.label}</p>
            <p className="player-epithet">{playerOption.subLabel}</p>
            <button
              className="btn-remove"
              type="button"
              onClick={() => {
                handleRemovePlayer(playerOption.key);
              }}
            >
              <i className="fas fa-times-circle" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
