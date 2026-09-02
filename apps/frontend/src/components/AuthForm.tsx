import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import herobg from "../bg-hero.jpg";
import { useMutation } from '@tanstack/react-query';
import { signin, signup } from '@/api/http';

interface AuthFormProps {
  type: 'signin' | 'signup';
}

export const AuthForm = ({ type }: AuthFormProps) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const isSignin = type === 'signin';


    //signin query
    const signinMutation = useMutation({
        mutationFn: signin,

        onSuccess: () => {
            setUsername('');
            setPassword('');
            navigate('/rooms');
        },

        onError: (err: Error) => {
          setFormError(err.message);
        }
    });

    const signupMutation = useMutation({
        mutationFn: signup,

        onSuccess: () => {
            setUsername('');
            setPassword('');
            navigate('/signin');
        },

        onError: (err: Error) => {
          setFormError(err.message);
        }
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const userName = username.trim();
        const Password = password.trim();

        if (!userName || !Password) {
          setFormError('Username and password are required.');
            return;
        }

        setFormError('');

        const payload = {
            username: userName,
            password: Password,
        };

        if (isSignin) {
            signinMutation.mutate(payload);
        } else {
            signupMutation.mutate(payload);
        }
    }

    function handleNavigate(path: string) {
        navigate(path);
    }

    const activeMutation = isSignin ? signinMutation : signupMutation;

return (
    <div className="min-h-screen w-full relative flex items-center bg-black justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0">
        <img
          src={herobg}
          className="h-180 w-full object-cover opacity-60 mask-b-from-80%"
        />
        <div className="absolute inset-0 z-10 bg-black/70" />
      </div>
      {/* Centered Card Container */}
      <div className="flex w-full max-w-145 border-primary/10 z-50 rounded-3xl shadow-2xl shadow-white-300/60 overflow-hidden border-2 border-white-200/80 min-h-145">

        <div className="w-full lg:w-full text-black bg-white/10 bg-linear-to-t from-10% from-accent to-white relative flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-sm space-y-6">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-black-900">
                {isSignin ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="mt-2 text-sm lowercase">
                {isSignin
                  ? 'Enter your credentials to access your account'
                  : 'Enter your details below to get started'}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4  " onSubmit={handleSubmit}>
              <div>
                <label className="block text-md font-medium text-black-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 rounded-xl border border-black-300 text-black-900 placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-black-900 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-md font-medium text-black-700">
                    Password
                  </label>
                  {isSignin && (
                    <a
                      href="#forgot-password"
                      className="text-xs font-medium text-black-600 hover:text-black-900 underline"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-black-300 text-black-900 placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-black-900 focus:border-transparent transition"
                  required
                />
              </div>

              {formError && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={activeMutation.isPending}
                className="w-full py-2.5 px-4 bg-black hover:bg-gray-900 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                {activeMutation.isPending ? 'Please wait...' : isSignin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            {/* Footer Navigation */}
            <p className="text-center text-sm text-black-500">
              {isSignin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => handleNavigate(isSignin ? '/signup' : '/signin')}
                className="font-semibold text-black-900 hover:underline cursor-pointer bg-transparent border-0 p-0 inline"
              >
                {isSignin ? 'Sign up' : 'Log in'}
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};