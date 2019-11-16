import * as React from "react";

const useNavigator = (trigger: any, redirectPath: string, redirectHandler: Function): void => {
  const pageLoaded = React.useRef(false);

  React.useEffect(() => {
    if (pageLoaded.current) {
      redirectHandler(redirectPath);
    } else {
      pageLoaded.current = true;
    }
  }, [trigger]);
};

export default useNavigator;
