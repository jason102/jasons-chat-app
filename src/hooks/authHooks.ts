import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { auth, firestoreDB } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  error: null | string;
  loading: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
  error: null | string;
  loading: boolean;
};

const firebaseErrors: { [firebaseError: string]: string } = {
  'Firebase: Error (auth/invalid-email).': 'Please enter a valid email',
  'Firebase: Password should be at least 6 characters (auth/weak-password).':
    'Password must be at least 6 characters',
  'Firebase: Error (auth/wrong-password).':
    'Password is invalid. Please try again.',
  'Firebase: Error (auth/user-not-found).':
    'User email not found. Please try again.',
};

const getErrorMessage = (error: any) => {
  const message = error.message as string;
  const messageToShow =
    message in firebaseErrors ? firebaseErrors[message] : message;

  return messageToShow;
};

export const useRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in',
      }));

      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firestoreDB, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,
      });

      navigate(fromPage, { replace: true });
    } catch (firebaseError: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: getErrorMessage(firebaseError),
        loading: false,
      }));
    }
  };

  return { handleSubmit, formData, setFormData };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in',
      }));

      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setFormData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });

      navigate(fromPage, { replace: true });
    } catch (firebaseError: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: getErrorMessage(firebaseError),
        loading: false,
      }));
    }
  };

  return { formData, setFormData, handleSubmit };
};
