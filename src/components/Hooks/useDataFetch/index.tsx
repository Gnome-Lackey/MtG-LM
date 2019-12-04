import * as React from "react";

const useDataFetch = (
  fetchCondition: boolean,
  handleFetch: Function
): void => {
  const [madeRequest, setMadeRequest] = React.useState(false);

  React.useEffect(() => {
    if (!madeRequest && !fetchCondition) {
      setMadeRequest(true);
      handleFetch();
    }
  }, [fetchCondition]);
};

export default useDataFetch;
