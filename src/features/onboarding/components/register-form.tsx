'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { registerSchema } from '../schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (!acceptTerms) {
      // Show error message for terms
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ ...values, acceptTerms });
    setIsLoading(false);
    // Here you would typically send the data to your API
  };

  return (
    <div className='space-y-6 max-w-md mx-auto'>
      <div className='space-y-2 text-center flex flex-col items-center'>
        {/* Logo */}
        <Link href={'/'}>
          <Image
            className='h-12 w-auto'
            src={'/logo.svg'}
            width={120}
            height={48}
            alt='TrackTr Logo'
          />
        </Link>
        <h1 className='text-3xl font-bold pt-4'>
          Start your free <br /> 15-day trial of TrackTr
        </h1>
        <p className='text-zinc-400 pt-3'>
          Already have an account?{' '}
          <Link
            href={'/login'}
            className='hover:text-orange-600 transition-colors duration-200'
          >
            Log in
          </Link>
        </p>
      </div>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid lg:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                      <span className='sr-only'>
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div className='flex items-start space-x-2 pt-4 pb-2'>
              <Checkbox
                id='terms'
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                I accept the{' '}
                <Link
                  href='/terms'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  terms of service
                </Link>{' '}
                and{' '}
                <Link
                  href='/privacy'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  privacy policy
                </Link>
              </label>
            </div>
            {!acceptTerms && form.formState.isSubmitted && (
              <p className='text-sm text-[#FF1818]'>
                You must accept the terms and conditions.
              </p>
            )}
          </div>
          <Button
            type='submit'
            className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Registering...
              </>
            ) : (
              'Start Free Trial'
            )}
          </Button>
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant='outline'
        className='w-full h-12 px-6 py-3 bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white text-md font-semibold rounded-md transition duration-200'
      >
        <Image src={'/google-icon.svg'} width={24} height={24} alt='google' />
        Sign up with Google
      </Button>
      <p className='text-xs text-center text-muted-foreground'>
        Want to join an existing account? The account owner or administrator
        must invite you to join.
      </p>
    </div>
  );
};

export default RegisterForm;
