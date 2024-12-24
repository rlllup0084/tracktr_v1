import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'First Name is required.' })
    .min(2, { message: 'First Name must be at least 2 characters long.' })
    .max(50, { message: 'First Name must not exceed 50 characters.' }),
  lastName: z
    .string()
    .nonempty({ message: 'Last Name is required.' })
    .min(2, { message: 'Last Name must be at least 2 characters long.' })
    .max(50, { message: 'Last Name must not exceed 50 characters.' }),
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
});