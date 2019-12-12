export interface Season {
  id: string;
  startedOn: Date;
  endedOn?: Date;
  isActive: boolean;
  set: string;
}
