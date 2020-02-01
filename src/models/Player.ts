export interface Player {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  totalWins?: number;
  totalLosses?: number;
  matches?: string[];
  epithet: string;
  favoriteColors: string[];
}

export interface PlayerRole {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  role: string;
}
