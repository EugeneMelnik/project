import { signOut } from 'firebase/auth';
import { auth } from '../config.js';

export async function logout() {
  return signOut(auth);
}
