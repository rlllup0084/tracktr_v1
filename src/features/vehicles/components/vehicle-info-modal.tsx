'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
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

const vehicleSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  engine: z.string().min(1, 'Engine information is required'),
  transmission: z.string().min(1, 'Transmission information is required'),
  drivenWheels: z.string().min(1, 'Driven wheels information is required'),
  exteriorColor: z.string().min(1, 'Exterior color is required'),
  interiorColor: z.string().min(1, 'Interior color is required'),
  mpg: z.object({
    city: z.number().min(0),
    highway: z.number().min(0),
  }),
});

type VehicleData = z.infer<typeof vehicleSchema>;

const VehicleInfoModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: VehicleData;
  onConfirm: (data: VehicleData) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<VehicleData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: data,
  });

  function onSubmit(values: VehicleData) {
    onConfirm(values);
    setIsEditing(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Vehicle Information</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                {Object.entries(data).map(([key, value]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof VehicleData}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='capitalize'>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </FormLabel>
                        <FormControl>
                          {key === 'mpg' ? (
                            <div className='flex space-x-2'>
                              <Input
                                {...field}
                                value={field.value.city}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    city: Number(e.target.value),
                                  })
                                }
                                placeholder='City'
                              />
                              <Input
                                {...field}
                                value={field.value.highway}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    highway: Number(e.target.value),
                                  })
                                }
                                placeholder='Highway'
                              />
                            </div>
                          ) : (
                            <Input {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          ) : (
            <div className='space-y-2'>
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className='flex'>
                  <span className='font-semibold capitalize w-1/3'>
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className='w-2/3'>
                    {key === 'mpg'
                      ? `City: ${value.city}, Highway: ${value.highway}`
                      : value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter className='sticky bottom-0 bg-background pt-2'>
          {isEditing ? (
            <>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={() => onConfirm(data)}>Confirm</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleInfoModal;
