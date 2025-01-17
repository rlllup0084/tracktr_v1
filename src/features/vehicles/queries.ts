import { VEHICLES_ID, DATABASE_ID } from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

export const getVehicles = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const vehicles = await databases.listDocuments(DATABASE_ID, VEHICLES_ID, [
    Query.equal('owner', user.$id),
  ]);

  //   return all vehicles if exists
  if (vehicles.documents.length > 0) {
    return vehicles.documents;
  } else {
    // return null if no vehicles
    return null;
  }
};
