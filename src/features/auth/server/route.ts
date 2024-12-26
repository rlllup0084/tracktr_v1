import { sessionMiddleware } from '@/lib/session-middleware';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema } from '../../onboarding/schemas';
import { createAdminClient } from '@/lib/appwrite';
import { AppwriteException, ID } from 'node-appwrite';
import { setCookie } from 'hono/cookie';
import { AUTH_COOKIE } from '@/features/auth/constants';
import {
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from '@/features/auth/schemas';

const app = new Hono()
  .get('/current', sessionMiddleware, (c) => {
    const user = c.get('user');

    return c.json({ data: user });
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const { account } = await createAdminClient();

    try {
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (error) {
      if ((error as AppwriteException).type === 'user_invalid_credentials') {
        return c.json({ success: false, message: 'Invalid credentials' }, 401);
      }
    }

    return c.json({ success: true });
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { firstName, lastName, email, password } = c.req.valid('json');
    const name = `${firstName} ${lastName}`;

    const { account } = await createAdminClient();

    try {
      await account.create(ID.unique(), email, password, name);
    } catch (error) {
      if (
        (error as AppwriteException).type === 'user_already_exists'
      ) {
        return c.json({ success: false, message: 'A user with the email address already exists' }, 409);
      }
    }

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    await account.createEmailToken(ID.unique(), email);

    return c.json({ success: true, message: 'User successfully registered' });
  })
  .post('/send_otp', zValidator('json', sendOtpSchema), async (c) => {
    const { email } = c.req.valid('json');

    const { account } = await createAdminClient();

    await account.createEmailToken(ID.unique(), email);

    return c.json({ success: true });
  })
  .post(
    '/verify_otp',
    sessionMiddleware,
    zValidator('json', verifyOtpSchema),
    async (c) => {
      const user = c.get('user');
      const users = c.get('users');
      const { otp } = c.req.valid('json');

      const { account } = await createAdminClient();
      try {
        await account.createSession(user.$id, otp);
      } catch (error) {
        if ((error as AppwriteException).type === 'user_invalid_token') {
          return c.json({ success: false, message: 'Invalid OTP' }, 401);
        }
      }

      // Mark user as verified
      try {
        await users.updateEmailVerification(
          user.$id, // userId
          true // emailVerification
        );
      } catch (error) {
        if (
          (error as AppwriteException).type === 'general_unauthorized_scope'
        ) {
          console.error('Unauthorized scope');
        }
      }

      return c.json({ success: true });
    }
  );

export default app;
