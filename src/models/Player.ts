export interface Player {
  id: string;
  name: string;
  userName: string;
  email: string;
  totalWins?: number;
  totalLosses?: number;
  matches?: string[];
}
