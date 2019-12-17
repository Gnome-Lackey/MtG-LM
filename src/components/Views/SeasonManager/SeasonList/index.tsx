import * as React from "react";

import { Season } from "models/Season";

import SeasonListItem from "./SeasonListItem";

import "./styles.scss";

interface SeasonListProps {
  createHandler: React.MouseEventHandler;
  deselectHandler: Function;
  selectHandler: Function;
  selectedSeason: Season;
  seasons: Season[];
}

const SeasonList = ({
  createHandler,
  deselectHandler,
  selectHandler,
  selectedSeason,
  seasons
}: SeasonListProps): React.FunctionComponentElement<SeasonListProps> => (
  <ul className="season-list">
    <li className="season-create">
      <button type="button" className="btn-create-season" onClick={createHandler}>
        <i className="fas fa-plus-circle" />
        <span className="title">Create New Season</span>
      </button>
    </li>
    {seasons.map((season) => (
      <SeasonListItem
        key={season.id}
        deselectHandler={deselectHandler}
        season={season}
        selectedSeason={selectedSeason}
        selectHandler={selectHandler}
      />
    ))}
  </ul>
);
export default SeasonList;
