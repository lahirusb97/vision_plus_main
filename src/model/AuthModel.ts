type User = {
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
};

type LoginResponse = {
  message: string;
  token: string;
  user: User;
};

export type { User, LoginResponse };
