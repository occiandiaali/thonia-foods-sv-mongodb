import { writable } from "svelte/store";

// export const isAuthenticated = writable(false);
// export const isAdmin = writable(false);
// export const isAttendant = writable(false);
// export const isKitchen = writable(false);
// export const fakeEmail = writable("");

// Define roles and permissions
export const ROLES = {
  ADMIN: "admin",
  ATTENDANT: "attendant",
  KITCHEN: "kitchen",
};

export const userStore = writable({
  name: "",
  email: "",
  isAuthenticated: false,
  role: ROLES.ATTENDANT,
});
