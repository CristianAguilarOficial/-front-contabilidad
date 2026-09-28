import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebase';

export const registerRequest = async (user) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  await updateProfile(credential.user, { displayName: user.username });
  await sendEmailVerification(credential.user);
  await signOut(auth);
  return { verified: false };
};

export const loginRequest = async (user) => {
  const credential = await signInWithEmailAndPassword(auth, user.email, user.password);
  if (!credential.user.emailVerified) {
    await signOut(auth);
    const error = new Error(
      'Por favor verifica tu correo antes de iniciar sesión'
    );
    error.code = 'auth/email-not-verified';
    throw error;
  }
  return credential.user;
};

export const logoutRequest = () => signOut(auth);

export const verifyTokenRequest = async () => auth?.currentUser?.getIdToken();