export interface SignInState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
}

export interface SignUpState {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export interface SessionData {
  user?: {
    id: number;
    email?: string;
    username?: string;
  };
}
