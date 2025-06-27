import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const register = async (
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'funcionario'
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, 'usuarios', user.uid), {
    uid: user.uid,
    nome: name,
    email,
    role,
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

// Pega o papel do usuário após login
export const getUserRole = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'usuarios', uid));
  if (docSnap.exists()) {
    return docSnap.data().role as 'admin' | 'funcionario';
  } else {
    return null;
  }
};
