export interface User {
  id: string;
  name: string;
  email?: string;
  isFirstTimeLogin?: boolean;
  privileges?: number;
}
