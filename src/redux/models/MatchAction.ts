export interface MatchAction {
  type: string;
  payload?: {
    loading?: boolean;
  };
}
