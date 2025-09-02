'use client';

import { BrainCircuit, LogOut, User, BookOpen, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function Header() {
  const { user, signOutUser } = useAuth();

  const getInitials = (email: string | undefined | null) => {
    if (!email) return '..';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <BrainCircuit className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            <h1 className="text-2xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
              3rd Eye CrossTraining
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/training">Training</Link>
            </Button>
             <Button asChild variant="ghost">
              <Link href="/directions">Directions</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/journal">Workout Journal</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/about">About</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/journal">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Workout Journal</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOutUser}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
