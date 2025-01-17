import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email format.' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/\d/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character.',
    }),
  rememberMe: z.boolean().default(false),
});

export const sendOtpSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required.' }),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 digits.' })
    .regex(/^\d{6}$/, { message: 'OTP must be a number.' }),
});
