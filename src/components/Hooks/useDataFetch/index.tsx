import * as React from "react";

const useDataFetch = (
  fetchCondition: boolean,
  handleFetch: Function
): void => {
  const [madeRequest, setMadeRequest] = React.useState(false);

  React.useEffect(() => {
    if (!madeRequest && !fetchCondition) {
      handleFetch();
      setMadeRequest(true);
    }
  }, [fetchCondition]);
};

export default useDataFetch;
