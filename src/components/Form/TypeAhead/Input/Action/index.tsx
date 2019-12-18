import * as React from "react";

import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface TypeAheadActionProps {
  hasText: boolean;
  isSearching: boolean;
  setSearchValue: Function;
}

const renderButton = (
  hasText: boolean,
  isSearching: boolean,
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
  }

  return null;
};

const TypeAheadAction = ({
  hasText,
  isSearching,
  setSearchValue
}: TypeAheadActionProps): React.FunctionComponentElement<TypeAheadActionProps> => {
  return (
    <div className="type-ahead-action">{renderButton(hasText, isSearching, setSearchValue)}</div>
  );
};

export default TypeAheadAction;
