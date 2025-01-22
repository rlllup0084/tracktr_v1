'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VinVehicleData, vinVehicleDataSchema } from '../utils/parseVehicleData';

const VehicleInfoModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: VinVehicleData;
  onConfirm: (data: VinVehicleData) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<VinVehicleData>({
    resolver: zodResolver(vinVehicleDataSchema),
    defaultValues: data,
  });

  function onSubmit(values: VinVehicleData) {
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
            <div>Editing</div>
          ) : (
            <div>Summary</div>
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
