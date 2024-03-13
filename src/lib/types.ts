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
  
  interface DateRange {
    start: Date;
    end: Date;
  }
  
  export interface LabFilters {
    name?: string;
    startDate?: DateRange;
    endDate?: DateRange;
    course?: string;
  }
  
  export interface EnrollArgs {
    pantherId: string;
    labName: string;
  }
  
  export interface UserCredentials {
    username: string;
    password: string;
  }
  
  export interface PostFilters {
    datePosted?: DateRange;
    author?: string;
    labName?: string;
  }
  
  export interface DeletionFilters {
    moderator?: number;
    deletionDate?: DateRange;
  }
