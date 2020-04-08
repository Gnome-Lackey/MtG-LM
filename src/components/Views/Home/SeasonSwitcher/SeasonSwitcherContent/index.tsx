import * as React from "react";

import Dropdown from "components/Form/Dropdown";
import Spinner from "components/Common/Spinner";

import { DropdownOption } from "components/Form/Dropdown/models/DropdownOption";

import "./styles.scss";

interface SeasonSwitcherContentProps {
  isLoading: boolean;
  noResults: boolean;
  seasonOptions: DropdownOption[];
  selectedSeasonOption: DropdownOption;
  selectHandler: Function;
}

const SeasonSwitcherContent: React.FunctionComponent<SeasonSwitcherContentProps> = ({
  isLoading,
  noResults,
  seasonOptions,
  selectedSeasonOption,
  selectHandler
}: SeasonSwitcherContentProps): React.FunctionComponentElement<SeasonSwitcherContentProps> => {
  if (isLoading) {
    return (
      <div className="season-switcher-spinner">
        <Spinner inline />
      </div>
    );
  } else if (noResults) {
    return (
      <div className="season-switcher-empty-message">
        <i className="fas fa-exclamation-circle" />
        <p className="message">
          There are currently no seasons in your league. Please contact an admin for more
          information.
        </p>
      </div>
    );
  } else {
    return (
      <Dropdown
        heightLimit={75}
        className="season-switcher-dropdown"
        selectHandler={(value: DropdownOption) => {
          selectHandler(value.key);
        }}
        emptyMessage="There are no seasons"
        options={seasonOptions}
        value={selectedSeasonOption}
      />
    );
  }
};

export default SeasonSwitcherContent;
