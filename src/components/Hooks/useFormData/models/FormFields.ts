export interface SignUpFields {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}

export interface LoginFields {
  password: string;
  userName: string;
}

export interface ConfirmFields {
  code: string;
}
