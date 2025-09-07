
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
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        setAuthTokenCookie(token);
      } else {
        setAuthTokenCookie(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    // Only redirect if the user is logged in, no longer loading, and on the login page.
    if (user && !isLoading && pathname === '/login') {
       router.replace('/training');
    }
  }, [user, isLoading, router, pathname]);

  const signUp = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
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
      // The onAuthStateChanged listener will handle setting the user, cookie, and redirect.
    } catch (e: any) {
      setError(e.message);
    } finally {
        setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle setting the user, cookie, and redirect.
    } catch (e: any) {
      setError(e.message);
    } finally {
        setIsLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
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

  // This outer isLoading check is for the initial load of the app
  // before Firebase has determined if a user is logged in or not.
  if (isLoading && !user) {
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
