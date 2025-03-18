import { signInWithEmailAndPassword } from 'firebase/auth';
import { getIdToken } from '@firebase/auth';
import { auth } from '../config.js';

export async function login({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const accessToken = await getIdToken(user);

  return { id: user.uid, accessToken, refreshToken: user.refreshToken };
}
