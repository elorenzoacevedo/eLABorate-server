export interface IUser {
  pantherId: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  labName?: string;
}

export interface UserFilters {
  pantherId?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  labName?: string;
}
