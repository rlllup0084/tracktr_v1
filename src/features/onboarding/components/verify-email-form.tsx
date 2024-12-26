'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Models } from 'node-appwrite';
import { useState } from 'react';

interface VerifyEmailFormProps {
  user: Models.User<Models.Preferences> | null;
}

const VerifyEmailForm = ({ user }: VerifyEmailFormProps) => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/onboarding/company');
  };

  return (
    <Card className='w-full max-w-md bg-transparent border-none'>
      <CardHeader className='pb-0'>
        <div className='flex flex-col items-center'>
          <Image
            className='h-12 w-auto'
            src={'/logo.svg'}
            width={120}
            height={48}
            alt='TrackTr Logo'
          />
          <h1 className='mt-6 text-3xl sm:text-3xl font-bold text-center pt-2'>
            Check your email
          </h1>
          <p className='mt-2 text-center text-sm sm:text-base text-zinc-400 pt-3'>
            A verification code has been sent to
            <br />
            <span className='text-zinc-100'>{user?.email}</span>
          </p>
          <p className='mt-2 text-center text-sm sm:text-base text-zinc-400'>
            Please enter the 6-digit code below to verify your account and
            complete your registration.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='flex justify-center space-x-2 sm:space-x-4'>
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type='text'
                maxLength={1}
                className='h-20 w-20 text-center md:text-5xl'
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
              />
            ))}
          </div>
          <Button
            type='submit'
            className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
          >
            Verify email
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-center'>
          <p className='text-sm sm:text-base text-zinc-400'>
            Didn&apos;t receive the code?{' '}
            <Button variant={'link'}>Click to resend</Button>
          </p>
          <p className='mt-2 text-xs sm:text-sm text-zinc-400'>
            Make sure to check your spam or junk folder if you don&apos;t see it
            in your inbox.
          </p>
        </div>
        {/* Slick Separator */}
        <div className='flex items-center justify-center space-x-4 text-zinc-400 text-sm md:text-base'>
                <span className='h-px w-16 bg-zinc-700'></span>
                <span>if this account is not yours</span>
                <span className='h-px w-16 bg-zinc-700'></span>
              </div>
        <div>
          <Button
            className={cn(
              'w-full h-12 px-6 py-3',
              'bg-transparent text-white hover:bg-transparent text-md font-semibold rounded-md transition duration-200'
            )}
            variant='outline'
            effect='expandIcon'
            icon={ArrowLeftIcon}
            iconPlacement='left'
          >
            Back to login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;
