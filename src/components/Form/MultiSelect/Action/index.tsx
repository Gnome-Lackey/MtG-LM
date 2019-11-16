import * as React from "react";
import classNames from "classnames";

import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface MultiSelectActionProps {
  hasText: boolean;
  isPanelMode: boolean;
  isSearching: boolean;
  isSelected: boolean;
  selectedCount: number;
  setShowSelected: Function;
  setSearchValue: Function;
}

const renderButton = (
  hasText: boolean,
  isPanelMode: boolean,
  isSearching: boolean,
  isSelected: boolean,
  selectedCount: number,
  setShowSelected: Function,
  setSearchValue: Function
): React.FunctionComponentElement<any> => {
  if (isSearching) {
    return <Spinner className="searching-spinner" inline />;
  } else if (hasText) {
    return (
      <button type="button" className="btn-clear" onClick={() => setSearchValue("")}>
        <i className="far fa-times-circle" />
      </button>
    );
  } else if (!isPanelMode) {
    return (
      <button type="button" className="btn-counter" onClick={() => setShowSelected(!isSelected)}>
        <span className="count">{selectedCount}</span>
        <i
          className={classNames("fas", {
            "fa-chevron-up": isSelected,
            "fa-chevron-down": !isSelected
          })}
        />
      </button>
    );
  }

  return null;
};

const MultiSelectAction = ({
  hasText,
  isPanelMode,
  isSearching,
  isSelected,
  selectedCount,
  setShowSelected,
  setSearchValue
}: MultiSelectActionProps): React.FunctionComponentElement<MultiSelectActionProps> => {
  return (
    <div className="multi-select-action">
      {renderButton(
        hasText,
        isPanelMode,
        isSearching,
        isSelected,
        selectedCount,
        setShowSelected,
        setSearchValue
      )}
    </div>
  );
};

export default MultiSelectAction;
