export default class StringUtility {
  toCapitalCase(text: string): string {
    return `${text.charAt(0)}${text.slice(1).toLowerCase()}`;
  }
}
