export interface CreateSeasonNode {
  startedOn: string;
  endedOn?: string;
  players?: string[];
  set: string;
  isActive: boolean;
}

export interface UpdateSeasonNode {
  startedOn?: string;
  endedOn?: string;
  players?: string[];
  set?: string;
  isActive?: boolean;
}
