import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required.' }),
  password: z.string().nonempty({ message: 'Password is required.' }),
});

export const sendOtpSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required.' }),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits.' }).regex(/^\d{6}$/, { message: 'OTP must be a number.' }),
});
