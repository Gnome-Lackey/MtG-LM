import * as React from "react";

import Dropdown from "components/Form/Dropdown";

import * as seasonMapper from "mappers/seasons";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { Season } from "models/Season";

import "./styles.scss";

interface SeasonSwitcherProps {
  selectHandler: Function;
  seasons: Season[];
  selectedSeason: Season;
}

const buildInitialDropdownOption = (selectedSeason: Season): DropdownOption => {
  return selectedSeason
    ? {
        label: selectedSeason.set.name,
        subLabel: selectedSeason.startedOn,
        key: selectedSeason.id
      }
    : null;
};

const SeasonSwitcher: React.FunctionComponent<SeasonSwitcherProps> = ({
  selectHandler,
  seasons,
  selectedSeason
}: SeasonSwitcherProps): React.FunctionComponentElement<SeasonSwitcherProps> => {
  const initialDropdownValue = buildInitialDropdownOption(selectedSeason);
  const options = seasons.map(seasonMapper.toOption);

  return (
    <div className="season-switcher">
      <p className="season-switcher-title">Currently Active Season</p>
      <Dropdown
        className="season-switcher-dropdown"
        selectHandler={(value: DropdownOption) => {
          selectHandler(value.key);
        }}
        options={options}
        placeholder="Please select a season..."
        value={initialDropdownValue}
      />
    </div>
  );
};

export default SeasonSwitcher;
