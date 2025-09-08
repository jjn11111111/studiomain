
'use client';

import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {onAuthStateChanged, User, getAuth} from 'firebase/auth';
import {app} from '@/lib/firebase';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {clearSessionCookie} from '@/app/auth/actions';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
  
  const signOutUser = async (): Promise<void> => {
    try {
      await auth.signOut();
      await clearSessionCookie();
      // Use router push and refresh to ensure state is cleared everywhere
      router.push('/');
      router.refresh();
    } catch (e: any) {
      console.error('Sign out error', e);
    }
  };

  const value = {
    user,
    isLoading,
    signOutUser,
  };

  // Prevent flicker of content by only rendering children when loading is complete
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
