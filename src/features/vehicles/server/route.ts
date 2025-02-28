import { vehicle } from '@/features/vehicles/server/route';
import {
  DATABASE_ID,
  VEHICLE_BODY_TYPE_ID,
  VEHICLE_COMPRESSOR_TYPE_ID,
  VEHICLE_DRIVE_TYPE_ID,
  VEHICLE_ENGINE_CONFIGURATION_ID,
  VEHICLE_ENGINE_TYPE_ID,
  VEHICLE_EPA_CLASS_ID,
  VEHICLE_FUEL_TYPE_ID,
  VEHICLE_MAKE_ID,
  VEHICLE_MARKET_CLASS_ID,
  VEHICLE_PRIMARY_BODY_TYPE_ID,
  VEHICLE_SIZE_ID,
  VEHICLE_TRANSMISSION_TYPE_ID,
  VEHICLE_TYPE_ID,
  VEHICLES_ID,
} from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { AppwriteException, ID, Query } from 'node-appwrite';
import { createVehicleSchema } from '../schema';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const vehicles = await databases.listDocuments(DATABASE_ID, VEHICLES_ID, [
        Query.equal('owner', user.$id),
      ]);

      if (vehicles.documents.length > 0) {
        return c.json(vehicles.documents);
      } else {
        return c.json({ message: 'No vehicles found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .post('/',zValidator('json', createVehicleSchema), sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const {
      vehicle_name,
      vin,
      make,
      model,
      year,
      body_type,
      vehicle_type,
      drive_type,
      number_of_doors,
      primary_body_type,
      vehicle_size,
      market_class,
      epa_class,
      engine_name,
      engine_type,
      horsepower,
      torque,
      cylinders,
      displacement,
      fuel_type,
      compression_ratio,
      compressor_type,
      engine_configuration,
      engine_code,
      manufacturer_engine_code,
      fuel_capacity,
      rpm,
      valve_timing,
      valve_gear,
      total_valves,
      transmission_type,
      number_of_speeds,
      transmission_name,
      city_economy,
      highway_economy,
    } = c.req.valid('json');

    try {
      const vehicle = await databases.createDocument(
        DATABASE_ID,
        VEHICLES_ID,
        ID.unique(),
        {
          vehicle_name,
          owner: user.$id,
          vin,
          make,
          model,
        }
      );

      return c.json(vehicle);
    } catch (error) {
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/makers', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const makers = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_MAKE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (makers.documents.length > 0) {
        return c.json(makers.documents);
      } else {
        return c.json({ message: 'No makers found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/body_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const bodyTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_BODY_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (bodyTypes.documents.length > 0) {
        return c.json(bodyTypes.documents);
      } else {
        return c.json({ message: 'No body types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/vehicle_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const vehicleTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (vehicleTypes.documents.length > 0) {
        return c.json(vehicleTypes.documents);
      } else {
        return c.json({ message: 'No vehicle types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/drive_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const driveTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_DRIVE_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (driveTypes.documents.length > 0) {
        return c.json(driveTypes.documents);
      } else {
        return c.json({ message: 'No drive types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/primary_body_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const primaryBodyTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_PRIMARY_BODY_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (primaryBodyTypes.documents.length > 0) {
        return c.json(primaryBodyTypes.documents);
      } else {
        return c.json({ message: 'No primary body types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/vehicle_sizes', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const sizes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_SIZE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (sizes.documents.length > 0) {
        return c.json(sizes.documents);
      } else {
        return c.json({ message: 'No vehicle sizes found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/market_classes', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const marketClasses = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_MARKET_CLASS_ID,
        [Query.equal('owner', user.$id)]
      );

      if (marketClasses.documents.length > 0) {
        return c.json(marketClasses.documents);
      } else {
        return c.json({ message: 'No market classes found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/epa_classes', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const epaClasses = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_EPA_CLASS_ID,
        [Query.equal('owner', user.$id)]
      );

      if (epaClasses.documents.length > 0) {
        return c.json(epaClasses.documents);
      } else {
        return c.json({ message: 'No EPA classes found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/engine_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const engineTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_ENGINE_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (engineTypes.documents.length > 0) {
        return c.json(engineTypes.documents);
      } else {
        return c.json({ message: 'No engine types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/fuel_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const fuelTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_FUEL_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (fuelTypes.documents.length > 0) {
        return c.json(fuelTypes.documents);
      } else {
        return c.json({ message: 'No fuel types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/compressor_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const compressorTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_COMPRESSOR_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (compressorTypes.documents.length > 0) {
        return c.json(compressorTypes.documents);
      } else {
        return c.json({ message: 'No compressor types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/engine_configurations', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const engineConfigurations = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_ENGINE_CONFIGURATION_ID,
        [Query.equal('owner', user.$id)]
      );

      if (engineConfigurations.documents.length > 0) {
        return c.json(engineConfigurations.documents);
      } else {
        return c.json({ message: 'No engine configurations found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/transmission_types', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    try {
      const transmissionTypes = await databases.listDocuments(
        DATABASE_ID,
        VEHICLE_TRANSMISSION_TYPE_ID,
        [Query.equal('owner', user.$id)]
      );

      if (transmissionTypes.documents.length > 0) {
        return c.json(transmissionTypes.documents);
      } else {
        return c.json({ message: 'No transmission types found' });
      }
    } catch (error) {
      if ((error as AppwriteException).type === 'general_unauthorized_scope') {
        return c.json({ error: 'Unauthorized access' }, 401);
      }
      return c.json({ error: 'Internal server error' }, 500);
    }
  });

export default app;
