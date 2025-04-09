'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NavBar from '@/components/nav-bar';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth-context';

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const baseUrl = 'http://localhost:5000/api';
      
      if (currentState === 'Sign Up') {
        const response = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Signup failed');
        }

        setCurrentState('Login');
        setPassword('');
      } else {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        
        

        let data;
        try {
          data = await response.json();

        } catch (e) {
          throw new Error('Unable to connect to authentication server. Please try again later.');
        }

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // Extract user data and token from the nested response structure
        const userData = data.data || {};
        const token = userData.token;
        const userInfo = userData.user || {};

        // Ensure we're using the name from the server response and handle both id and _id
        const userId = userInfo.id || userInfo._id;
        if (!userId) {
          throw new Error('User ID not found in response');
        }

        setUser({
          id: userId,
          name: userInfo.name || email.split('@')[0],
          email: email,
          token: token
        });

        // Log the complete user data for debugging
        console.log('Login successful, complete user data:', { userId, token, userInfo });
        
        // Log the user data for debugging
        console.log('Login successful, user data:', data);
        
        
        
        if (rememberMe) {
          localStorage.setItem('lastLogin', new Date().toISOString());
        }
        
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(
        error instanceof Error
          ? error.message
          : `An error occurred during ${currentState.toLowerCase()}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentState === 'Login' ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-gray-600 mt-2">
              {currentState === 'Login' ? 'Please sign in to your account' : 'Join us to get started'}
            </p>
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentState === 'Sign Up' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your full name as it appears on official documents</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/50 border-white/30 focus:border-purple-500 transition-colors duration-200"
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter a valid email address you have access to</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/50 border-white/30 focus:border-purple-500 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {currentState === 'Login' ? 'Password' : 'Create Password'}
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {currentState === 'Login'
                          ? 'Enter your secure password'
                          : 'Password must be at least 8 characters with uppercase, numbers, and special characters'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={currentState === 'Login' ? 'Enter your password' : 'Create a strong password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/50 border-white/30 focus:border-purple-500 transition-colors duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {currentState === 'Sign Up' && password && (
                <div className="space-y-2">
                  <Progress value={passwordStrength} className="h-2 bg-gray-200" />
                  <p className={`text-sm ${passwordStrength === 100 ? 'text-green-600' : passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    Password strength: {passwordStrength === 100 ? '✅ Strong' : passwordStrength >= 50 ? '🟡 Medium' : '❌ Weak'}
                  </p>
                </div>
              )}
            </div>
            {currentState === 'Login' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                >
                  Remember me
                </label>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading
                ? currentState === 'Login' ? 'Signing in...' : 'Creating account...'
                : currentState === 'Login' ? 'Sign in' : 'Sign up'}
            </Button>
            {currentState === 'Login' && (
              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot your password?
                </Link>
              </div>
            )}
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {currentState === 'Login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}