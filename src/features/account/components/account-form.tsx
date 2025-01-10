'use client';

import Image from 'next/image';
import ProgressSidebar from './progress-sidebar';
import { accountSteps } from '@/features/account/accountSteps';
import { useEffect, useState } from 'react';
import { useCreateAccount } from '../api/use-create-account';
import { Button } from '@/components/ui/button';
import PreparingAccountOverlay from './preparing-account-overlay';
import { useUpdateVinDecoder } from '../api/use-update-vin-decoder';
import { useGetAccount } from '../api/use-get-account';
import { Account } from '../types';
import { useUpdateAccount } from '../api/use-update-account';
import { useUpdateTraccarIntegration } from '../api/use-update-traccar-integration';
import { Loader2 } from 'lucide-react';

const AccountForm = () => {
  const { data: initialValues, isLoadingValue } = useGetAccount();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdatingAccount } =
    useUpdateAccount();
  const { mutate: updateVinDecoder, isPending: isUpdatingVinDecoder } =
    useUpdateVinDecoder();
  const {
    mutate: updateTraccarIntegration,
    isPending: isUpdatingTraccarIntegration,
  } = useUpdateTraccarIntegration();

  const CurrentStepComponent = accountSteps[currentStep].component;

  useEffect(() => {
    if (isCreatingAccount) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isCreatingAccount]);

  useEffect(() => {
    if (isUpdatingAccount) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [isUpdatingAccount]);

  useEffect(() => {
    if (isUpdatingVinDecoder) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [isUpdatingVinDecoder]);

  useEffect(() => {
    if (isUpdatingTraccarIntegration) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [isUpdatingTraccarIntegration]);

  const handleNext = async (data: Account) => {
    console.log('Current Step:', currentStep);
    if (currentStep === 1) {
      // if data is null, then create account else update account
      if (initialValues === null) {
        createAccount({ json: data });
      } else {
        const combinedData = { ...initialValues, ...data };
        updateAccount({ json: data, param: { accountId: combinedData.$id } });
      }
      // move to the next step after 5 seconds
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, accountSteps.length - 1));
      }, 5000);
    }
    if (currentStep === 2) {
      console.log('Update Traccar data:', data);
      if (initialValues !== null) {
        const combinedData = { ...initialValues, ...data };
        // If data has attribute traccar_api_url, then update traccar integration
        if (data['traccar_api']) {
          updateTraccarIntegration({
            json: data,
            param: { accountId: combinedData.$id },
          });
        } else if (data['vin_decoder_key']) {
          updateVinDecoder({
            json: data,
            param: { accountId: combinedData.$id },
          });
        }
      }
    }
    if (currentStep === 3) {
      // TODO: Adding initial vehicles step
    }
    if (currentStep === 4) {
      // TODO: Adding last step to finish the account creation
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
    <>
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
            isUpdating={isUpdating}
            data={initialValues}
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
              {currentStep === accountSteps.length - 1 ? (
                'Finish'
              ) : isUpdating ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Updating...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Modal Loading Overlay */}
      <PreparingAccountOverlay loading={isLoading} />
    </>
  );
};

export default AccountForm;
