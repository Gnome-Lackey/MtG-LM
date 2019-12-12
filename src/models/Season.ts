import { Set } from "models/Set";

export interface SeasonBase {
  id: string;
  startedOn: Date;
  endedOn?: Date;
  isActive: boolean;
}

export interface Season extends SeasonBase {
  set: string;
}

export interface SeasonDetails extends SeasonBase {
  set: Set;
}
