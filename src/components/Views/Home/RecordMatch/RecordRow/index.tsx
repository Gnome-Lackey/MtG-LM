import * as React from "react";

import TypeAhead from "components/Form/TypeAhead";
import FormInput from "components/Form/Input";

import * as playerMapper from "mappers/players";

import { Player } from "models/Player";
import { PlayerRecordFields } from "components/Hooks/useFormData/models/FormFields";
import { PlayerSearchResultMap } from "redux/player/models/State";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

import "./styles.scss";

interface RecordRowProps {
  clearHandler: Function;
  playerRecords: PlayerRecordFields[];
  playerSearchResultsMap: PlayerSearchResultMap;
  record: PlayerRecordFields;
  searchHandler: Function;
  updateValues: Function;
}

const RecordRow: React.FunctionComponent<RecordRowProps> = ({
  clearHandler,
  playerRecords,
  playerSearchResultsMap,
  record,
  searchHandler,
  updateValues
}: RecordRowProps): React.FunctionComponentElement<RecordRowProps> => {
  const recordConfig = playerSearchResultsMap[record.id];
  const list = recordConfig && recordConfig.list ? recordConfig.list : [];
  const isSearching = recordConfig && recordConfig.searching ? recordConfig.searching : false;

  const playerOptions = list.reduce(
    (options: TypeAheadOption[], player: Player): TypeAheadOption[] => {
      const playerSelectedAlready = playerRecords.some(
        (playerRecord) => playerRecord.player && playerRecord.player.key === player.id
      );

      if (!playerSelectedAlready) {
        options.push(playerMapper.toOption(player));
      }

      return options;
    },
    []
  );

  const handleUpdateValues = (key: string, value: object): void => {
    const playerRecordIndex = playerRecords.findIndex((nextRecord) => nextRecord.id === record.id);

    const updatedPlayerRecords = [...playerRecords];

    updatedPlayerRecords[playerRecordIndex] = {
      ...updatedPlayerRecords[playerRecordIndex],
      ...value
    };

    updateValues(key, updatedPlayerRecords);
  };

  return (
    <div className="record-row">
      <TypeAhead
        id={`${record.id}-player`}
        isSearching={isSearching}
        options={playerOptions}
        placeholder="Player Name"
        clearHandler={() => {
          clearHandler(record.id);
        }}
        searchHandler={(value: string) => {
          searchHandler(record.id, value);
        }}
        selectHandler={(option: TypeAheadOption) => {
          handleUpdateValues("playerRecords", { player: option });
        }}
      />
      <FormInput
        id={`${record.id}-wins`}
        placeholder="Wins"
        type="number"
        onChange={(key: string, value: string) => {
          handleUpdateValues("playerRecords", { wins: value ? parseInt(value, 10) : 0 });
        }}
        value={record.wins}
      />
    </div>
  );
};

export default RecordRow;
