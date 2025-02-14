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
import { CheckIcon, Truck } from 'lucide-react';
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
      <DialogContent className='sm:max-w-[600px] h-[90vh] flex flex-col overflow-hidden'>
        <DialogHeader className='flex-row items-center gap-3'>
          <div className='rounded-full bg-zinc-800 p-2'>
            <Truck className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1'>
            <DialogTitle className='text-xl font-semibold'>
              {steps[currentStep].title}
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              {steps[currentStep].description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className='flex justify-center mb-10 relative'>
          <ul className='flex items-center list-none p-2 m-0'>
            {steps.map((step, index) => (
              <li key={index} className='relative flex flex-col items-center'>
                {/* Step indicator */}
                <div className='flex items-center'>
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      index === currentStep
                        ? 'border-primary bg-primary text-primary-foreground'
                        : index < currentStep
                        ? 'border-green-500 bg-green-500/10 text-green-500'
                        : 'border-slate-800 text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckIcon className='h-5 w-5' />
                    ) : (
                      <span className='text-sm font-medium'>{index + 1}</span>
                    )}
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className='w-24 mx-2'>
                      <div
                        className={`h-[2px] ${
                          index < currentStep ? 'bg-green-500' : 'bg-slate-800'
                        }`}
                      />
                    </div>
                  )}
                </div>
                {/* Step title */}
                <div className='absolute top-12 w-24 text-center'>
                  <span 
                    className={`text-xs leading-tight block ${
                      index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
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
