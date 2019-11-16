import * as React from "react";

const useScrollToElement = (elementId: string, trigger: any[]): void => {
  React.useEffect(() => {
    const element = document.getElementById(elementId);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, trigger);
};

export default useScrollToElement;
