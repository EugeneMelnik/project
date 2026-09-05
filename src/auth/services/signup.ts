import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default async function signup(email: string, password: string) {
  const authentication = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    authentication,
    email,
    password,
  );

  const { user } = userCredential;

  return user;
}
