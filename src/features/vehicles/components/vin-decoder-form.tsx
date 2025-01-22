'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import VehicleInfoModal from './vehicle-info-modal';
import { useGetAccount } from '@/features/account/api/use-get-account';
import { parse } from 'path';
import { parseVehicleData } from '../utils/parseVehicleData';

const formSchema = z.object({
  vin: z
    .string()
    .length(17, { message: 'VIN must be exactly 17 characters long' }),
});

const VinDecoderForm = ({
  onVehicleConfirmed,
}: {
  onVehicleConfirmed: (vehicle: unknown) => void;
}) => {
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: accountValues, isLoading: isLoadingAccount } = useGetAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vin: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const account = Array.isArray(accountValues) ? accountValues[0] : accountValues;
    if (!account?.vin_decoder_key) {
      console.error('VIN decoder key is not available');
      return;
    }
    
    setIsLoading(true);
    try {
      // const response = await fetch(`/api/decode-vin?vin=${values.vin}`);
      const response = await fetch(
        `/api/proxy/api/vin/${values.vin}?target=https://auto.dev/api&token=${account.vin_decoder_key}&authType=bearer`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log('VIN decoded data:', data);
        const parsedData = parseVehicleData(data);
        console.log('Parsed vehicle data:', parsedData);
        setVehicleData(parsedData);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching VIN data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='vin'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Vehicle Identification Number (VIN)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter 17-character VIN'
                    {...field}
                    className='text-lg p-6'
                  />
                </FormControl>
                <FormDescription className='text-sm'>
                  Please enter the 17-character VIN of the vehicle.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={isLoading}
            className='w-full h-12 px-6 py-3 bg-green-600 hover:bg-green-700 border border-green-600 text-white text-md font-semibold rounded-md transition duration-200'
          >
            {isLoading ? 'Decoding...' : 'Decode VIN'}
          </Button>
        </form>
      </Form>
      {vehicleData && (
        <VehicleInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={vehicleData}
          onConfirm={(confirmedData) => {
            onVehicleConfirmed(confirmedData);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default VinDecoderForm;
