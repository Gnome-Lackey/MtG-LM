import * as React from "react";
import * as classNames from "classnames";

import { Season } from "models/Season";

import "./styles.scss";

interface SeasonListItemProps {
  deselectHandler: Function;
  selectHandler: Function;
  selectedSeason: Season;
  season: Season;
}

const SeasonListItem = ({
  deselectHandler,
  selectHandler,
  selectedSeason,
  season
}: SeasonListItemProps): React.FunctionComponentElement<SeasonListItemProps> => {
  const handleSelectSeason = (selected: Season): void => {
    const isSelected = selectedSeason && selectedSeason.id === selected.id;

    if (isSelected) {
      deselectHandler();
    } else {
      selectHandler(selected);
    }
  };

  const isSelected = selectedSeason && selectedSeason.id === season.id;

  return (
    <li key={season.id} className={classNames("season-list-item", { selected: isSelected })}>
      <button
        type="button"
        className="btn-season"
        onClick={() => {
          handleSelectSeason(season);
        }}
      >
        <div className="season-description">
          <p className="season-set-name">
            <i className={`ss ss-${season.set.code}`} />
            {season.set.name}
          </p>
          {season.isActive ? (
            <div className="indicator-container">
              <div className="indicator" />
            </div>
          ) : null}
        </div>
        <p className="season-date-range">
          {`${season.startedOn} - ${season.endedOn || "present"}`}
        </p>
      </button>
    </li>
  );
};

export default SeasonListItem;
