export type UserRole = 'demo' | 'admin';

export interface UserConfig {
  username: string;
  password: string;
  role: UserRole;
}

export const USERS: UserConfig[] = [
  {
    username: "admin",
    password: "IntelliOps@2026",
    role: "demo"
  },
  {
    username: "admin_development",
    password: "IntelliOps@Dev",
    role: "admin"
  }
];

export const AUTH_STORAGE_KEY = "intelliops_authenticated";
export const ROLE_STORAGE_KEY = "intelliops_role";

export function authenticateUser(username: string, password: string): UserConfig | null {
  return USERS.find(u => u.username === username && u.password === password) || null;
}
