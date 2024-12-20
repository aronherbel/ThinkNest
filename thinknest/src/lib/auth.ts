import { users } from './users';

export const isAuthenticated = (): boolean => {
  // Authentifizierungsstatus aus localStorage überprüfen
  return !!localStorage.getItem("authToken");
};

export const registerUser = (email: string, password: string): boolean => {
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    return false; // User existiert bereits
  }

  users.push({ email, password });
  return true; // Registrierung erfolgreich
};

export const loginUser = (email: string, password: string): boolean => {
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem("authToken", "example-token"); // Authentifizierung simulieren
    return true; // Login erfolgreich
  }

  return false; // Login fehlgeschlagen
};

export const logoutUser = (): void => {
  localStorage.removeItem("authToken"); // Token entfernen
};
