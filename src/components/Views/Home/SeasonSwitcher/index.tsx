import * as React from "react";

import SeasonSwitcherContent from "components/Views/Home/SeasonSwitcher/SeasonSwitcherContent";

import SeasonMapper from "mappers/seasons";

import { Season } from "models/Season";

import "./styles.scss";

const seasonMapper = new SeasonMapper();

interface SeasonSwitcherProps {
  isLoading: boolean;
  seasons: Season[];
  selectedSeason: Season;
  selectHandler: Function;
}

const SeasonSwitcher: React.FunctionComponent<SeasonSwitcherProps> = ({
  isLoading,
  seasons,
  selectedSeason,
  selectHandler
}: SeasonSwitcherProps): React.FunctionComponentElement<SeasonSwitcherProps> => {
  const selectedSeasonOption = selectedSeason ? seasonMapper.toOption(selectedSeason) : null;
  const seasonOptions = seasons.length ? seasons.map(seasonMapper.toOption) : [];

  const noResults = !selectedSeason && !seasons.length;

  return (
    <div className="season-switcher">
      <p className="season-switcher-title">Currently Active Season</p>
      <SeasonSwitcherContent
        isLoading={isLoading}
        noResults={noResults}
        selectedSeasonOption={selectedSeasonOption}
        selectHandler={selectHandler}
        seasonOptions={seasonOptions}
      />
    </div>
  );
};
export default SeasonSwitcher;
