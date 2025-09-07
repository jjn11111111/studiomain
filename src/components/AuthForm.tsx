'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Loader2} from 'lucide-react';
import {signInWithEmail, signUpWithEmail} from '@/app/auth/actions';
import {useAuth} from '@/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email({message: 'Invalid email address.'}),
  password: z.string().min(1, {message: 'Password is required.'}),
});

const registerSchema = z.object({
  email: z.string().email({message: 'Invalid email address.'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}),
});

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to training
    if (!isLoading && user) {
      router.replace('/training');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setError(null);
  }, [activeTab]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {email: '', password: ''},
  });

  const handleAction = async (action: (formData: FormData) => Promise<any>, values: any) => {
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const result = await action(formData);
    
    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // On successful login, the useAuth hook's onAuthStateChanged will
      // trigger, setting the user and causing a redirect.
      // We can also force a refresh to ensure all server state is up-to-date.
      router.push('/training');
      router.refresh();
    }
  };
  
  // If loading or user is already present, don't show the form
  if (isLoading || user) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit((values) => handleAction(signInWithEmail, values))} className="space-y-4 mt-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="register">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit((values) => handleAction(signUpWithEmail, values))} className="space-y-4 mt-4">
            <FormField
              control={registerForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}