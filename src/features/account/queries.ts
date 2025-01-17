import { ACCOUNTS_ID, DATABASE_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

export const getAccount = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const accounts = await databases.listDocuments(DATABASE_ID, ACCOUNTS_ID,
    [Query.equal("owner", user.$id)]
  );

  if (accounts.documents.length > 0) {
    return accounts.documents[0];
  } else {
    return null;
  }
};
