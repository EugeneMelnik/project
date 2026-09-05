import { getAuth, signOut } from 'firebase/auth';

export default async function logout() {
  const authentication = getAuth();

  await signOut(authentication);
}
