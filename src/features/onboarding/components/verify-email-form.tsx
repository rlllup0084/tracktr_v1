'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSendOtp } from '@/features/auth/api/use-send-otp';
import { useVerifyOtp } from '@/features/auth/api/use-verify-otp';
import { sendOtpSchema, verifyOtpSchema } from '@/features/auth/schemas';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Models } from 'node-appwrite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface VerifyEmailFormProps {
  user: Models.User<Models.Preferences> | null;
}

const VerifyEmailForm = ({ user }: VerifyEmailFormProps) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const { mutate: resendOtp, isPending: isResendingOtp } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyOtpSchema>) => {
    verifyOtp({ json: values });
  };

  const handleResend = async (values: z.infer<typeof sendOtpSchema>) => {
    resendOtp({ json: values });
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
        <Form {...form}>
          <form
            className='mt-8 space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex justify-center space-x-2 sm:space-x-4'>
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Input
                          key={index}
                          type='text'
                          inputMode='numeric'
                          maxLength={1}
                          className='h-16 w-14 text-center md:text-2xl'
                          value={code[index]}
                          onChange={(e) => {
                            const newCode = [...code];
                            newCode[index] = e.target.value;
                            setCode(newCode);
                            field.onChange(newCode.join(''));
                            if (e.target.value && index < 5) {
                              const nextInput = document.getElementById(
                                `code-${index + 1}`
                              );
                              nextInput?.focus();
                            }
                          }}
                          id={`code-${index}`}
                        />
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
              disabled={isVerifyingOtp}
            >
              {isVerifyingOtp ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Verifying...
                </>
              ) : (
                'Verify email'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-center'>
          <p className='text-sm sm:text-base text-zinc-400'>
            Didn&apos;t receive the code?{' '}
            <Button
              type='button'
              variant={'link'}
              onClick={() => handleResend({ email: user?.email || '' })}
              disabled={isResendingOtp}
            >
              {isResendingOtp ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Resending...
                </>
              ) : (
                'Click to resend'
              )}
            </Button>
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
