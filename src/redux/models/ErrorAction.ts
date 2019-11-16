export interface ErrorAction {
  type: string;
  payload?: {
    view: string;
    domain: string;
    value?: any;
  }
};
