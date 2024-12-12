// lib/auth.ts
import { users } from './users';
import { redirect } from 'next/navigation';

export const isAuthenticated = false;

export const registerUser = (email: string, password: string): boolean => {
  const userExists: boolean = users.some((user) => user.email === email);
  
  if (userExists) {
    return false;
  }
  else{
    users.push({ email, password });
    redirect('/auth/login');
  }  
};

export const loginUser = (email: string, password: string): boolean => {
  const user = users.find((user) => user.email === email && user.password === password);

  if (user == null) {
    return false;
  }
  redirect('/dashboard');
};

