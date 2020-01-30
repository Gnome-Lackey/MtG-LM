import * as React from "react";

import Dropdown from "components/Form/Dropdown";

import * as seasonMapper from "mappers/seasons";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { Season } from "models/Season";

import "./styles.scss";

interface SeasonSwitcherProps {
  seasons: Season[];
  selectedSeason: Season;
  selectHandler: Function;
}

const SeasonSwitcher: React.FunctionComponent<SeasonSwitcherProps> = ({
  seasons,
  selectedSeason,
  selectHandler
}: SeasonSwitcherProps): React.FunctionComponentElement<SeasonSwitcherProps> => {
  const selectedSeasonOption = selectedSeason ? seasonMapper.toOption(selectedSeason) : null;
  const options = seasons.map(seasonMapper.toOption);

  return (
    <div className="season-switcher">
      <p className="season-switcher-title">Currently Active Season</p>
      <Dropdown
        heightLimit={75}
        className="season-switcher-dropdown"
        selectHandler={(value: DropdownOption) => {
          selectHandler(value.key);
        }}
        options={options}
        value={selectedSeasonOption}
      />
    </div>
  );
};

export default SeasonSwitcher;
