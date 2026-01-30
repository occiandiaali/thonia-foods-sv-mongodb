// Define roles and permissions
export const ROLES = {
  ADMIN: "admin",
  ATTENDANT: "attendant",
  KITCHEN: "kitchen",
};

export const userState = $state({
  isAuthenticated: false,
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  role: ROLES.ATTENDANT,
  password: "",
});
