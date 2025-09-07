'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth as getAuth, db as getDb } from '@/lib/firebase';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Helper function to manage the auth token cookie
const setAuthTokenCookie = (token: string | null) => {
  if (typeof document === 'undefined') return;
  if (token) {
    // Set cookie that expires in 24 hours
    document.cookie = `firebaseAuthToken=${token}; path=/; max-age=86400; SameSite=Lax; Secure`;
  } else {
    // Delete cookie
    document.cookie = 'firebaseAuthToken=; path=/; max-age=-1;';
  }
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<UserCredential | void>;
  signUp: (email: string, pass: string) => Promise<UserCredential | void>;
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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setAuthTokenCookie(token);
      } else {
        setUser(null);
        setAuthTokenCookie(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const auth = getAuth();
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
      return userCredential;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const auth = getAuth();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
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
    )
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
