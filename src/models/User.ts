export interface User {
  id: string;
  name: string;
  email?: string;
  isFirstTimeLogin?: boolean;
  accountType?: string;
}
