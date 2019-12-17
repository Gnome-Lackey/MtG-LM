import { Set } from "./Set";

export interface Season {
  id: string;
  startedOn: Date;
  endedOn?: Date;
  isActive: boolean;
  set: Set;
}
