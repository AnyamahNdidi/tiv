// UserDataTypes.ts

export type UserStatus = "Active" | "Deactivated";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  admin_roles: string;
  // status: UserStatus;
}
