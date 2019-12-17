import * as React from "react";
import * as classNames from "classnames";

import { Season } from "models/Season";

import SeasonListItem from "./SeasonListItem";

import "./styles.scss";

interface SeasonListProps {
  createHandler: React.MouseEventHandler;
  deselectHandler: Function;
  selectHandler: Function;
  selectedSeason: Season;
  seasons: Season[];
  showForm: boolean;
}

const SeasonList = ({
  createHandler,
  deselectHandler,
  selectHandler,
  selectedSeason,
  seasons,
  showForm
}: SeasonListProps): React.FunctionComponentElement<SeasonListProps> => (
  <ul className="season-list">
    <li className={classNames("season-create", { selected: showForm && !selectedSeason })}>
      <button type="button" className="btn-create-season" onClick={createHandler}>
        <span className="title">Create New Season</span>
        <i className="fas fa-plus-circle" />
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
