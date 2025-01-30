'use client';

import { useState } from 'react';
import { AccountStepProps } from '../interface';
import VehicleCountDisplay from '../../vehicles/components/vehicle-count-display';
import { Card, CardContent } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VinDecoderForm from '../../vehicles/components/vin-decoder-form';
import ManualAddVehicleForm from '../../vehicles/components/manual-add-vehicle-form';
import VehiclesBatchUploadForm from '../../vehicles/components/vehicles-batch-upload-form';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/custom-tabs';

const VehiclesStep = ({ onSubmit }: AccountStepProps) => {
  const [vehicles, setVehicles] = useState<unknown[]>([]);
  const vehicleLimit = 10; // This would typically come from an API based on the user's subscription

  const addVehicle = (vehicle: unknown) => {
    if (vehicles.length < vehicleLimit) {
      setVehicles((prev) => [...prev, vehicle]);
    } else {
      alert(
        "You've reached your vehicle limit. Please upgrade your subscription to add more vehicles."
      );
    }
  };

  const addVehicles = (newVehicles: unknown[]) => {
    const availableSlots = vehicleLimit - vehicles.length;
    const vehiclesToAdd = newVehicles.slice(0, availableSlots);
    setVehicles((prev) => [...prev, ...vehiclesToAdd]);

    if (newVehicles.length > availableSlots) {
      alert(
        `Only ${availableSlots} vehicles were added. You've reached your vehicle limit. Please upgrade your subscription to add more vehicles.`
      );
    }
  };

  return (
    <>
      <div>
        <div className='mt-8 space-y-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            Register Your Fleet Vehicles
          </h1>
          <p className='text-gray-400'>
            Register your vehicles by entering their VIN numbers, manually
            adding details, or using our bulk upload feature for multiple
            vehicles.
          </p>
        </div>
        <div>
          <VehicleCountDisplay
            currentCount={vehicles.length}
            limit={vehicleLimit}
          />
        </div>
        <Card className='mb-8 shadow-lg border-none bg-transparent'>
          <CardContent className='p-0'>
            <TabsRoot defaultValue='vin-decoder' className='space-y-4'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='vin-decoder'>VIN Decoder</TabsTrigger>
                <TabsTrigger value='manual-add'>Manual Add</TabsTrigger>
                <TabsTrigger value='batch-upload'>Batch Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="vin-decoder">
                <VinDecoderForm onVehicleConfirmed={addVehicle} />
              </TabsContent>
              <TabsContent value="manual-add">
                <ManualAddVehicleForm onVehicleAdded={addVehicle} />
              </TabsContent>
              <TabsContent value="batch-upload">
                <VehiclesBatchUploadForm onVehiclesUploaded={addVehicles} />
              </TabsContent>
            </TabsRoot>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VehiclesStep;
