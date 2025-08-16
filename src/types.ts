export type Screen =
  | "dashboard"
  | "clients"
  | "inventory"
  | "invoices"
  | "reports"
  | "settings"
  | "profile";

export type Language = "en" | "hi";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  role?: "admin" | "user" | "guest";
}
