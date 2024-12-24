import { ACCOUNTS_ID, DATABASE_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';

export const getAccount = async () => {
  const { databases } = await createSessionClient();

  const accounts = await databases.listDocuments(DATABASE_ID, ACCOUNTS_ID);

  if (accounts.documents.length > 0) {
    return accounts.documents[0];
  } else {
    return { message: 'Account not yet created' };
  }
};
