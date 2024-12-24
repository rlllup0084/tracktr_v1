import { ACCOUNTS_ID, DATABASE_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  createAccountSchema,
  updateExpiryAndLimitSchema,
  updateTraccarIntegrationSchema,
  updateVinDecoderSchema,
} from '../schema';
import { ID } from 'node-appwrite';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');

    const accounts = await databases.listDocuments(DATABASE_ID, ACCOUNTS_ID);

    if (accounts.documents.length > 0) {
      return c.json(accounts.documents[0]);
    } else {
      return c.json({ message: "Account not yet created" });
    }
  })
  .post(
    '/',
    zValidator('json', createAccountSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const {
        company_name,
        fleet_size,
        industry,
        company_role,
        enable_demo_data,
      } = c.req.valid('json');

      const existingAccounts = await databases.listDocuments(
        DATABASE_ID,
        ACCOUNTS_ID
      );

      if (existingAccounts.total > 0) {
        return c.json({ error: 'An account already exists.' }, 400);
      }

      const trialExpiryDate = new Date();
      trialExpiryDate.setDate(trialExpiryDate.getDate() + 15);

      const accounts = await databases.createDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        ID.unique(),
        {
          company_name,
          fleet_size,
          industry,
          company_role,
          enable_demo_data,
          trial_expiry_date: trialExpiryDate.toISOString(),
        }
      );

      return c.json({ data: accounts });
    }
  )
  .patch(
    '/:accountId',
    zValidator('json', updateExpiryAndLimitSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const { trial_expiry_date, asset_limit } = c.req.valid('json');

      const { accountId } = c.req.param();

      const accounts = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          trial_expiry_date,
          asset_limit,
        }
      );

      return c.json({ data: accounts });
    }
  )
  .patch(
    '/:accountId/traccar',
    zValidator('json', updateTraccarIntegrationSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const { traccar_api_url, username, password } = c.req.valid('json');

      const { accountId } = c.req.param();

      const accounts = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          traccar_api: traccar_api_url,
          traccar_api_token: Buffer.from(`${username}:${password}`).toString(
            'base64'
          ),
        }
      );

      return c.json({ data: accounts });
    }
  )
  //   VIN Decoder provided by Auto Dev auto.dev
  .patch(
    '/:accountId/vin_decoder',
    zValidator('json', updateVinDecoderSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const { vin_decoder_key } = c.req.valid('json');

      const { accountId } = c.req.param();

      const accounts = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          vin_decoder_key,
        }
      );

      return c.json({ data: accounts });
    }
  );

export default app;
