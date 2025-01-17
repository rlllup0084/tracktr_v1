import { z } from "zod";

export const createVehicleSchema = z.object({
    vehicle_name: z.string().max(100).nonempty({ message: "Vehicle Name is required." }),
    vin: z.string().length(17, { message: "VIN must be exactly 17 characters long" }),
    // make must accept such as "Toyota" or "Toyota Motor Corporation" before saving it in the db, the system will validate if it already exists, if not theb it will create a new make in the makes table
    make: z.string().nonempty({ message: "Make is required" }).max(100),
    model: z.string().nonempty({ message: "Model is required" }).max(50), // eg. Corolla, Camry, etc.
    // year must be between 1900 and the current year plus 1
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    trim: z.string().max(50), // eg. LE, XLE, SE, etc.
    body_type: z.string().max(50), // eg. sedan, coupe, suv, etc.
    vehicle_type: z.string().max(50), // eg. passenger, commercial, etc.
    drive_type: z.string().max(50), // eg. FWD, RWD, AWD, 4WD
    number_of_doors: z.number().int().min(0), // eg. 2, 4
    primary_body_type: z.string().max(50), // eg. sedan, coupe, suv, etc.
    vehicle_size: z.string().max(50), // eg. compact, mid-size, full-size
    market_class: z.string().max(50), // eg. economy, luxury, sports, etc.
    epa_class: z.string().max(50), // eg. Environmental Protection Agency class
    engine_name: z.string().max(50), // eg. 2.0L I4, 3.5L V6, etc.
    engine_type: z.string().max(50), // eg. gasoline, diesel, electric, etc.
    horsepower: z.number().int().min(0), // in hp
    torque: z.number().int().min(0), // in lb-ft
    cylinders: z.number().int().min(0), // eg. 4, 6, 8
    displacement: z.number().int().min(0), // in cubic centimeters
    fuel_type: z.string().max(50), // eg. regular, premium, diesel, etc.
    compression_ratio: z.number().min(0), // eg. 10.5:1
    compressor_type: z.string().max(50), // eg. turbo, supercharger, etc.
    engine_configuration: z.string().max(50), // eg. inline, V, flat, etc.
    engine_code: z.string().max(50), // eg. 2JZ-GTE
    manufacturer_engine_code: z.string().max(50),
    fuel_capacity: z.string().max(50), // in gallons or liters eg. 20 gal or 20 L
    rpm: z.number().int().min(0), // e.g. 6000
    valve_timing: z.string().max(50), // eg. DOHC
    valve_gear: z.string().max(50), // eg. 4 valves per cylinder
    total_valves: z.number().int().min(0), // eg. 16
    transmission_type: z.string().max(50), // eg. automatic
    number_of_speeds: z.number().int().min(0), // eg. 6
    transmission_name: z.string().max(50), // eg. 6-speed automatic
    city_economy:  z.string().max(50), // in mpg or km/l
    highway_economy:  z.string().max(50), // in mpg or km/l
});

export const createMakeSchema = z.object({
    make: z.string().nonempty({ message: "Make is required" }).max(100),
});

export const createBodyTypeSchema = z.object({
    body_type: z.string().max(50), // eg. sedan, coupe, suv, etc.
});

export const createVehicleTypeSchema = z.object({
    vehicle_type: z.string().max(50), // eg. passenger, commercial, etc.
});

export const createDriveTypeSchema = z.object({
    drive_type: z.string().max(50), // eg. FWD, RWD, AWD, 4WD
});

export const createPrimaryBodyTypeSchema = z.object({
    primary_body_type: z.string().max(50), // eg. sedan, coupe, suv, etc.
});

export const createVehicleSizeSchema = z.object({
    vehicle_size: z.string().max(50), // eg. compact, mid-size, full-size
});

export const createMarketClassSchema = z.object({
    market_class: z.string().max(50), // eg. economy, luxury, sports, etc.
});

export const createEpaClassSchema = z.object({
    epa_class: z.string().max(50), // eg. Environmental Protection Agency class
});

export const createEngineTypeSchema = z.object({
    engine_type: z.string().max(50), // eg. gasoline, diesel, electric, etc.
});

export const createFuelTypeSchema = z.object({
    fuel_type: z.string().max(50), // eg. regular, premium, diesel, etc.
});

export const createCompressorTypeSchema = z.object({
    compressor_type: z.string().max(50), // eg. turbo, supercharger, etc.
});

export const createEngineConfigurationSchema = z.object({
    engine_configuration: z.string().max(50), // eg. inline, V, flat, etc.
});

export const createTransmissionTypeSchema = z.object({
    transmission_type: z.string().max(50), // eg. automatic
});

// Initial odometer reading
export const updateOdometerSchema = z.object({
    // values can be kilometers or miles depending on the user's preference, whatever he chooses here will be the default for all future readings
    odometer_reading: z.number().int().min(0),
    odometer_unit: z.enum(["km", "mi"]),
    // add date of the reading
    odometer_reading_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
        (date) => new Date(date) <= new Date(),
        { message: "Date cannot be in the future" }
    ),
});

// Add acquisition information
export const updateAcquisitionSchema = z.object({
    acquisition_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
        (date) => new Date(date) <= new Date(),
        { message: "Date cannot be in the future" }
    ),
    acquisition_price: z.number().int().min(0), // in the currency of the user's choice
    acquisition_currency: z.string().max(3), // ISO 4217 currency code eg. USD, EUR, JPY
    acquisition_vendor: z.string().max(50),
    acquisition_classification: z.enum(["owned", "leased", "rented"]),
    acquisition_warranty_provider: z.string().max(50),
    acquisition_warranty: z.string().max(50), // e.g. 3 years or 36,000 miles
    acquisition_warranty_expiration: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
        (date) => new Date(date) >= new Date(),
        { message: "Date cannot be in the past" }
    ),
    // warranty coverage type
    // what is basic and extended warranty?
    // basic warranty is the manufacturer's warranty that comes with the vehicle when you buy it new
    // extended warranty is an additional warranty that you can purchase from the manufacturer or a third party
    acquisition_warranty_coverage: z.enum(["basic", "extended"]),
    // warranty coverage duration which ever comes first, in months or km/mi
    acquisition_warranty_duration: z.number().int().min(0), // in months
    acquisition_warranty_mileage: z.number().int().min(0), // in km or mi
    acquisition_warranty_mileage_unit: z.enum(["km", "mi"]),
    acquisition_notes: z.string().max(500), // eg. warranty coverage details
});
 
// add update Traccar connection information
export const updateTraccarConnectionSchema = z.object({
    traccar_device_id: z.string().max(50), // unique identifier for the device in Traccar
    traccar_device_model: z.string().max(50), // model of the device
});