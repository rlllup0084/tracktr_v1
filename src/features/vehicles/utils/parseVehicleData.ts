import { z } from 'zod';

export const vinVehicleDataSchema = z.object({
  vehicleName: z.string().max(100).optional(),
  vin: z
    .string()
    .length(17, { message: 'VIN must be exactly 17 characters long' })
    .optional(),
  make: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
      niceName: z.string().optional(),
    })
    .optional(),
  maker: z.string().optional(),
  model: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      niceName: z.string().optional(),
    })
    .optional(),
  vehicleModel: z.string().optional(),
  year: z.number().int().min(1900).optional(),
  bodyType: z.string().optional(),
  trim: z.string().optional(),
  vehicleType: z.string().optional(),
  vehicleStyle: z.string().optional(),
  primaryBodyType: z.string().optional(),
  market: z.string().optional(),
  vehicleSize: z.string().optional(),
  epaClass: z.string().optional(),
  engineName: z.string().max(100).optional(),
  engine: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      equipmentType: z.string().optional(),
      availability: z.string().optional(),
      compressionRatio: z.number().optional(),
      cylinder: z.number().optional(),
      size: z.number().optional(),
      displacement: z.number().optional(),
      configuration: z.string().optional(),
      fuelType: z.string().optional(),
      horsepower: z.number().optional(),
      torque: z.number().optional(),
      totalValves: z.number().optional(),
      type: z.string().optional(),
      code: z.string().optional(),
      compressorType: z.string().optional(),
      manufacturerEngineCode: z.string().optional(),
      rpm: z
        .object({
          horsepower: z.number().optional(),
          torque: z.number().optional(),
        })
        .optional(),
      valve: z
        .object({
          timing: z.string().optional(),
          gear: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  transmission: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      equipmentType: z.string().optional(),
      availability: z.string().optional(),
      automaticType: z.string().optional(),
      transmissionType: z.string().optional(),
      numberOfSpeeds: z.string().optional(),
    })
    .optional(),
  drivenWheels: z.string().optional(),
  numOfDoors: z.string().optional(),
  fuelCapacity: z.number().optional(),
  options: z
    .array(
      z.object({
        category: z.string().optional(),
        options: z
          .array(
            z.object({
              id: z.string().optional(),
              name: z.string().optional(),
              equipmentType: z.string().optional(),
              availability: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
  colors: z
    .array(
      z.object({
        category: z.string().optional(),
        options: z
          .array(
            z.object({
              id: z.string().optional(),
              name: z.string().optional(),
              equipmentType: z.string().optional(),
              availability: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
  price: z
    .object({
      baseMsrp: z.number().optional(),
      deliveryCharges: z.number().optional(),
      estimateTmv: z.boolean().optional(),
    })
    .optional(),
  categories: z
    .object({
      primaryBodyType: z.string().optional(),
      market: z.string().optional(),
      crossover: z.string().optional(),
      epaClass: z.string().optional(),
      vehicleSize: z.string().optional(),
      vehicleType: z.string().optional(),
      vehicleStyle: z.string().optional(),
    })
    .optional(),
  squishVin: z.string().optional(),
  styleId: z.string().optional(),
  years: z
    .array(
      z.object({
        id: z.number().optional(),
        year: z.number().int().min(1900),
        styles: z
          .array(
            z.object({
              id: z.number().optional(),
              name: z.string().optional(),
              submodel: z
                .object({
                  body: z.string().optional(),
                  modelName: z.string().optional(),
                  niceName: z.string().optional(),
                })
                .optional(),
              trim: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
  matchingType: z.string().optional(),
  mpg: z
    .object({
      highway: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
    mpgCity: z.string().optional(),
    mpgHighway: z.string().optional(),
});

export type VinVehicleData = z.infer<typeof vinVehicleDataSchema>;

export function parseVehicleData(jsonData: unknown): VinVehicleData {
  return vinVehicleDataSchema.parse(jsonData);
}
