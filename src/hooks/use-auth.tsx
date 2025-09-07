'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  getAuth,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db as getDb } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const setAuthTokenCookie = (token: string | null) => {
  if (typeof document === 'undefined') return;
  if (token) {
    document.cookie = `firebaseAuthToken=${token}; path=/; max-age=86400; SameSite=Lax; Secure`;
  } else {
    document.cookie = 'firebaseAuthToken=; path=/; max-age=-1;';
  }
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const db = getDb();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        subscription: {
          status: 'free',
        },
      });
      const token = await user.getIdToken();
      setAuthTokenCookie(token);
    } catch (e: any) {
        setError(e.message);
        throw e;
    } finally {
        setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setAuthTokenCookie(token);
    } catch (e: any) {
        setError(e.message);
        throw e;
    } finally {
        setIsLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setError(null);
    try {
      await signOut(auth);
      setAuthTokenCookie(null);
      window.location.href = '/';
    } catch (e: any) {
      setError(e.message);
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOutUser,
    error,
    setError,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
