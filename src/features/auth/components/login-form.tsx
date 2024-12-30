'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { useLogin } from '../api/use-login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <div className='space-y-6 container mx-auto max-w-md my-auto'>
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
        <h1 className='text-3xl font-bold pt-4'>We&apos;re excited to <br /> see you back!</h1>
        <p className='text-zinc-400 pt-3'>
          Don&apos;t have an account?{' '}
          <Link
            href={'/register'}
            className='hover:text-orange-600 transition-colors duration-200'
          >
            Register
          </Link>{' '}
        </p>
      </div>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          <div className='flex items-center justify-between'>
            <FormField
              control={form.control}
              name='rememberMe'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal text-white'>
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            {/* 'hover:text-orange-600 transition-colors duration-200' */}
            <Link href={'/forgot-password'} className='text-sm hover:text-orange-600 transition-colors duration-200'>
              Forgot Password?
            </Link>
          </div>
          <Button
            type='submit'
            className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Logging in...
              </>
            ) : (
              'Log in'
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
    </div>
  );
};

export default LoginForm;
