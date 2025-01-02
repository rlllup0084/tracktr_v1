'use client';

import { Button } from '@/components/ui/button';
import { accountSteps } from '@/features/account/accountSteps';
import PreparingAccountOverlay from '@/features/account/components/preparing-account-overlay';
import ProgressSidebar from '@/features/account/components/progress-sidebar';
import Image from 'next/image';
import { useState } from 'react';

const AccountPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const CurrentStepComponent = accountSteps[currentStep].component;
  console.log(CurrentStepComponent.name);

  const handleNext = () => {
    console.log('Next');
    setCurrentStep((prev) => Math.min(prev + 1, accountSteps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Submit');
    setIsLoading(true);
    // Simulating an API call or some async operation
    setTimeout(() => {
      // Route to the integrations page after showing the loading modal for 3 seconds
      setIsLoading(false);
    }, 3000);
  };

  // const onSubmit = (values: z.infer<typeof createAccountSchema>) => {
  //   onLoadingChange(true);
  //   // Simulating an API call or some async operation
  //   setTimeout(() => {
  //     // Route to the integrations page after showing the loading modal for 3 seconds
  //     onLoadingChange(false);
  //     console.log(values);
  //   }, 3000);
  // };

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
          {/* <CompanyStep onLoadingChange={setIsLoading} /> */}
          <CurrentStepComponent
            onSubmit={
              currentStep === accountSteps.length - 1
                ? handleSubmit
                : handleNext
            }
          />
          <div>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              form={`step-${currentStep + 1}-form`}
              type='submit'
            >
              {currentStep === accountSteps.length - 1 ? 'Submit' : 'Next'}
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
