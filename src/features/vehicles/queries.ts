import {
  VEHICLES_ID,
  DATABASE_ID,
  VEHICLE_MAKE_ID,
  VEHICLE_BODY_TYPE_ID,
  VEHICLE_TYPE_ID,
  VEHICLE_DRIVE_TYPE_ID,
  VEHICLE_PRIMARY_BODY_TYPE_ID,
  VEHICLE_SIZE_ID,
  VEHICLE_MARKET_CLASS_ID,
  VEHICLE_EPA_CLASS_ID,
  VEHICLE_ENGINE_TYPE_ID,
  VEHICLE_FUEL_TYPE_ID,
  VEHICLE_COMPRESSOR_TYPE_ID,
  VEHICLE_ENGINE_CONFIGURATION_ID,
  VEHICLE_TRANSMISSION_TYPE_ID,
} from '@/config';
import { createSessionClient } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

export const getVehicles = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const vehicles = await databases.listDocuments(DATABASE_ID, VEHICLES_ID, [
    Query.equal('owner', user.$id),
  ]);

  if (vehicles.documents.length > 0) {
    return vehicles.documents;
  } else {
    return null;
  }
};

export const getVehicleMakers = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const makers = await databases.listDocuments(DATABASE_ID, VEHICLE_MAKE_ID, [
    Query.equal('owner', user.$id),
  ]);

  if (makers.documents.length > 0) {
    return makers.documents;
  } else {
    return null;
  }
};

export const getVehicleBodyTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_BODY_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(DATABASE_ID, VEHICLE_TYPE_ID, [
    Query.equal('owner', user.$id),
  ]);

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleDriveTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_DRIVE_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehiclePrimaryBodyTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_PRIMARY_BODY_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleSizes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const sizes = await databases.listDocuments(DATABASE_ID, VEHICLE_SIZE_ID, [
    Query.equal('owner', user.$id),
  ]);

  if (sizes.documents.length > 0) {
    return sizes.documents;
  } else {
    return null;
  }
};

export const getVehicleMarketClasses = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const classes = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_MARKET_CLASS_ID,
    [Query.equal('owner', user.$id)]
  );

  if (classes.documents.length > 0) {
    return classes.documents;
  } else {
    return null;
  }
};

export const getVehicleEpaClasses = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const classes = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_EPA_CLASS_ID,
    [Query.equal('owner', user.$id)]
  );

  if (classes.documents.length > 0) {
    return classes.documents;
  } else {
    return null;
  }
};

export const getVehicleEngineTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_ENGINE_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleFuelTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_FUEL_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleCompressorTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_COMPRESSOR_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};

export const getVehicleEngineConfigurations = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const configurations = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_ENGINE_CONFIGURATION_ID,
    [Query.equal('owner', user.$id)]
  );

  if (configurations.documents.length > 0) {
    return configurations.documents;
  } else {
    return null;
  }
};

export const getVehicleTransmissionTypes = async () => {
  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();
  const user = await account.get();

  const types = await databases.listDocuments(
    DATABASE_ID,
    VEHICLE_TRANSMISSION_TYPE_ID,
    [Query.equal('owner', user.$id)]
  );

  if (types.documents.length > 0) {
    return types.documents;
  } else {
    return null;
  }
};
