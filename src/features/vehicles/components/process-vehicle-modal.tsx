'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VehicleData } from '../schema';
import { VinVehicleData } from '../utils/parseVehicleData';
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleInformationStep from './vehicle-information-step';
import OdometerReadingStep from './odometer-reading-step';
import AcquisitionInformationStep from './acquisition-information-step';
import TelematicsSetupStep from './telematics-setup-step';

// Create props interface
interface ProcessVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: VinVehicleData;
  onConfirm: (data: VehicleData) => void;
}

const steps = [
  {
    title: 'Vehicle Information',
    description: 'Enter basic details and specifications of the vehicle',
  },
  {
    title: 'Odometer Reading',
    description: 'Record current mileage and odometer status',
  },
  {
    title: 'Acquisition Information',
    description: 'Input purchase/lease details and documentation',
  },
  {
    title: 'Telematics Setup',
    description: 'Configure tracking and monitoring systems',
  },
];

const ProcessVehicleModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
}: ProcessVehicleModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log('Form submitted');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] h-[600px] flex flex-col'>
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center mb-6 relative'>
          <div className='flex items-center p-2 rounded-full'>
            {steps.map((step, index) => (
              <div key={index} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    index <= currentStep
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckIcon className='h-4 w-4' />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-[2px] w-20 mx-1 ${
                      index < currentStep ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='flex-grow overflow-y-auto'>
          {currentStep === 0 && <VehicleInformationStep />}
          {currentStep === 1 && <OdometerReadingStep />}
          {currentStep === 2 && <AcquisitionInformationStep />}
          {currentStep === 3 && <TelematicsSetupStep />}
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessVehicleModal;
