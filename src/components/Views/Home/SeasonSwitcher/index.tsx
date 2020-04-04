import * as React from "react";

import Dropdown from "components/Form/Dropdown";

import SeasonMapper from "mappers/seasons";

import { DropdownOption } from "components/Form/Dropdown/models/DropdownOption";
import { Season } from "models/Season";

import "./styles.scss";

const seasonMapper = new SeasonMapper();

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
  const seasonOptions = seasons.length ? seasons.map(seasonMapper.toOption) : [];

  return (
    <div className="season-switcher">
      <p className="season-switcher-title">Currently Active Season</p>
      <Dropdown
        heightLimit={75}
        className="season-switcher-dropdown"
        selectHandler={(value: DropdownOption) => {
          selectHandler(value.key);
        }}
        emptyMessage="There are currently no active seasons."
        options={seasonOptions}
        value={selectedSeasonOption}
      />
    </div>
  );
};

export default SeasonSwitcher;
