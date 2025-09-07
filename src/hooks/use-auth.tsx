
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  getAuth,
  IdTokenResult,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db as getDb } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { setAuthCookie, clearAuthCookie } from '@/app/auth/actions';

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
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
            const token = await user.getIdToken();
            await setAuthCookie(token);
        } catch (cookieError) {
            console.error("Failed to set auth cookie:", cookieError)
        }
      } else {
        await clearAuthCookie();
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const signUp = (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        setError(null);
        try {
            const db = getDb();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            await setDoc(doc(db, 'users', newUser.uid), {
                email: newUser.email,
                createdAt: new Date(),
                subscription: { status: 'free' },
            });
            // The onAuthStateChanged listener will handle the cookie. 
            // We resolve once we're sure the user object is set.
            const unsub = onAuthStateChanged(auth, (authUser) => {
                if (authUser && authUser.uid === newUser.uid) {
                    unsub(); // Unsubscribe to avoid memory leaks
                    resolve();
                }
            });
        } catch (e: any) {
            const errorCode = e.code || 'An unknown error occurred';
            setError(errorCode.replace('auth/', '').replace(/-/g, ' '));
            reject(e);
        }
    });
  };

  const signIn = (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // The onAuthStateChanged listener will handle the cookie. 
            // We resolve once we're sure the user object is set.
            const unsub = onAuthStateChanged(auth, (authUser) => {
                if (authUser && authUser.uid === userCredential.user.uid) {
                    unsub(); // Unsubscribe to avoid memory leaks
                    resolve();
                }
            });
        } catch (e: any) {
            const errorCode = e.code || 'An unknown error occurred';
            setError(errorCode.replace('auth/', '').replace(/-/g, ' '));
            reject(e);
        }
    });
  };

  const signOutUser = async (): Promise<void> => {
    setError(null);
    try {
      await signOut(auth);
      window.location.assign('/login');
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
