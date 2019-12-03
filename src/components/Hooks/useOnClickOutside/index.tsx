import * as React from "react";

const handleOnClickOutside = (
  currentElement: HTMLElement,
  clickHandler: Function
): EventListener => (ev: Event) => {
  if (!currentElement) {
    return;
  }

  const containsElement = currentElement.contains(ev.target as any);

  if (!containsElement) {
    clickHandler();
  }
};

const useOnClickOutside = (
  referencedElement: React.RefObject<HTMLElement>,
  clickHandler: Function
): void => {
  React.useEffect(() => {
    const eventListener = handleOnClickOutside(referencedElement.current, clickHandler);

    window.addEventListener("click", eventListener);

    return () => {
      window.removeEventListener("click", eventListener);
    };
  }, [referencedElement]);
};

export default useOnClickOutside;
