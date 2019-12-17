import * as React from "react";

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
    if (selectedSeason && selectedSeason.id === selected.id) {
      deselectHandler();
    } else {
      selectHandler(selected);
    }
  };

  return (
    <li key={season.id} className="season-list-item">
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
          {season.isActive ? <span className="indicator" /> : null}
        </div>
        <p className="season-date-range">
          {`${season.startedOn} - ${season.endedOn || "present"}`}
        </p>
      </button>
    </li>
  );
};

export default SeasonListItem;
