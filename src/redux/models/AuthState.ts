export interface AuthState {
  codeResent?: boolean;
  confirmed?: boolean;
  confirmationCodeNeeded?: boolean;
  confirmationNeeded?: boolean;
  loggingOut?: boolean;
  validated?: boolean;
};
