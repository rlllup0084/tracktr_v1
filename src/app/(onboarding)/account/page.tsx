'use client';

import { Button } from '@/components/ui/button';
import { accountSteps } from '@/features/account/accountSteps';
import { useCreateAccount } from '@/features/account/api/use-create-account';
import PreparingAccountOverlay from '@/features/account/components/preparing-account-overlay';
import ProgressSidebar from '@/features/account/components/progress-sidebar';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AccountPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

  const CurrentStepComponent = accountSteps[currentStep].component;

  useEffect(() => {
    if (isCreatingAccount) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isCreatingAccount]);

  const handleNext = async (data: unknown) => {
    if (currentStep === 1) {
      createAccount({ json: data });
    }
    // TODO: If current component is IntegrationsStep, do data processing....
    if (currentStep === 2) {
      // const values = form.getValues();
      // console.log(values);
    }
    // TODO: If current component is VehiclesStep, do data processing....
    if (currentStep === 3) {
      // const values = form.getValues();
      // console.log(values);
    }
    // TODO: If current component is ReadyStep, do data processing....
    if (currentStep === 4) {
      // const values = form.getValues();
      // console.log(values);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulating an API call or some async operation
    setTimeout(() => {
      // Route to the integrations page after showing the loading modal for 3 seconds
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className='flex flex-col lg:flex-row max-w-7xl m-auto min-h-[calc(100vh-4rem)] text-white'>
      {/* Step progress pane */}
      <ProgressSidebar currentStep={currentStep} />
      {/* Step forms */}
      <div className='flex-grow px-4 py-8 lg:px-8'>
        <div className='mx-auto max-w-2xl'>
          <Image
            className='h-12 w-auto'
            src={'/logo.svg'}
            width={120}
            height={48}
            alt='TrackTr Logo'
          />
            <CurrentStepComponent
            onSubmit={
              currentStep === accountSteps.length - 1
              ? handleSubmit
              : handleNext
            }
            
            />
            <div className='w-full flex flex-col lg:flex-row justify-between mt-8 space-y-4 lg:space-y-0 lg:space-x-4'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className='w-full h-12 px-6 py-3 bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white text-md font-semibold rounded-md transition duration-200'
            >
              Back
            </Button>
            <Button
              form={`step-${currentStep + 1}-form`}
              type='submit'
              className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
            >
              {currentStep === accountSteps.length - 1 ? 'Finish' : 'Continue'}
            </Button>
            </div>
        </div>
      </div>
      {/* Modal Loading Overlay */}
      <PreparingAccountOverlay loading={isLoading} />
    </div>
  );
};

export default AccountPage;
