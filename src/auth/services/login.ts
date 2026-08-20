import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default async function login(email: string, password: string) {
  const authentication = getAuth();

  const userCredential = await signInWithEmailAndPassword(
    authentication,
    email,
    password,
  );

  const { user } = userCredential;

  return user;
}
