export interface Season {
  id: string;
  set: string;
  startedOn: Date;
  endedOn?: Date;
  isActive: boolean;
}
