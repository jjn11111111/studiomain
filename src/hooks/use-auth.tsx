
'use client';

import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {onAuthStateChanged, User, getAuth} from 'firebase/auth';
import {app} from '@/lib/firebase';
import {Loader2} from 'lucide-react';
import {useRouter, usePathname} from 'next/navigation';
import {clearSessionCookie} from '@/app/auth/actions';
import { getUserProfile, UserProfile } from '@/lib/firestore';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  idToken: string | null;
  isLoading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROTECTED_ROUTES = ['/profile', '/journal', '/exercise'];
// Note: '/training' can be accessed by non-logged in users to see the modules.

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);

        // If a logged-in user is on the login page, redirect them.
        if (pathname === '/login') {
          router.replace('/training');
        }
      } else {
        setIdToken(null);
        setUserProfile(null);
        
        // If a logged-out user is on a protected route, redirect them.
        const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
        if (isProtectedRoute) {
          router.replace('/login');
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth, pathname, router]);
  
  const signOutUser = async (): Promise<void> => {
    try {
      await auth.signOut();
      await clearSessionCookie();
      // Use router push and refresh to ensure state is cleared everywhere
      router.push('/login');
      router.refresh();
    } catch (e: any)      {
      console.error('Sign out error', e);
    }
  };

  const value = {
    user,
    userProfile,
    idToken,
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
