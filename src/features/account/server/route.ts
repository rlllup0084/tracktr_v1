import { ACCOUNTS_ID, DATABASE_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  createAccountSchema,
  updateExpiryAndLimitSchema,
  updateStepsSchema,
  updateTraccarIntegrationSchema,
  updateVinDecoderSchema,
} from '../schema';
import { AppwriteException, ID, Query } from 'node-appwrite';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get("user");

    try {
      const accounts = await databases.listDocuments(DATABASE_ID, ACCOUNTS_ID,
        [Query.equal("owner", user.$id)]
      );
  
      if (accounts.documents.length > 0) {
        return c.json(accounts.documents[0]);
      } else {
        return c.json({ message: "Account not yet created" });
      }
    } catch (error) {
      if (
        (error as AppwriteException).type === 'general_unauthorized_scope'
      ) {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
    }
  })
  .post(
    '/',
    zValidator('json', createAccountSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get("user");
      const {
        company_name,
        fleet_size,
        industry,
        company_role,
        goals,
        enable_demo_data,
        steps_done,
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
          goals,
          enable_demo_data,
          trial_expiry_date: trialExpiryDate.toISOString(),
          owner: user.$id,
          steps_done
        }
      );

      return c.json({ data: accounts });
    }
  )
  // TODO: Add update account route
  .put(
    '/:accountId',
    zValidator('json', createAccountSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get("user");
      const { accountId } = c.req.param();
      const {
        company_name,
        fleet_size,
        industry,
        company_role,
        goals,
        enable_demo_data,
        steps_done,
      } = c.req.valid('json');

      const account = await databases.getDocument(DATABASE_ID, ACCOUNTS_ID, accountId);

      if (account.owner !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const updatedAccount = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          company_name,
          fleet_size,
          industry,
          company_role,
          goals,
          enable_demo_data,
          steps_done,
        }
      );

      return c.json({ data: updatedAccount });
    }
  )
  .patch(
    '/:accountId',
    zValidator('json', updateExpiryAndLimitSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get("user");
      const { trial_expiry_date, asset_limit } = c.req.valid('json');

      const { accountId } = c.req.param();

      const account = await databases.getDocument(DATABASE_ID, ACCOUNTS_ID, accountId);

      if (account.owner !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

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
      const user = c.get("user");
      const { traccar_api, username, password } = c.req.valid('json');

      const { accountId } = c.req.param();

      const account = await databases.getDocument(DATABASE_ID, ACCOUNTS_ID, accountId);

      if (account.owner !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const accounts = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          traccar_api,
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
      const user = c.get("user");
      const { vin_decoder_key } = c.req.valid('json');

      const { accountId } = c.req.param();

      const account = await databases.getDocument(DATABASE_ID, ACCOUNTS_ID, accountId);

      if (account.owner !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

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
  )
  //  Update steps done and skipped
  .patch(
    '/:accountId/steps',
    zValidator('json', updateStepsSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get('databases');
      const user = c.get("user");
      const { steps_done_array, steps_skipped_array } = c.req.valid('json');

      const { accountId } = c.req.param();

      const account = await databases.getDocument(DATABASE_ID, ACCOUNTS_ID, accountId);

      if (account.owner !== user.$id) {
        return c.json({ error: 'Unauthorized' }, 403);
      }

      const accounts = await databases.updateDocument(
        DATABASE_ID,
        ACCOUNTS_ID,
        accountId,
        {
          steps_done_array,
          steps_skipped_array,
        }
      );

      return c.json({ data: accounts });
    });

export default app;
