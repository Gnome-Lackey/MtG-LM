export const updateClassBy = (selector: string, base: string, classes: string[]): void => {
  const element = document.querySelector(selector);

  element.setAttribute("class", `${base} ${classes.join(' ')}`);
};
