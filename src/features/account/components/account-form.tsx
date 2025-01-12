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
  const [isAccountSaving, setIsAccountSaving] = useState(false);
  const [currentData, setCurrentData] = useState<Account | null>(null);
  const [stepsDoneArray, setStepsDoneArray] = useState<number[]>([]);
  const [stepsSkippedArray, setStepsSkippedArray] = useState<number[]>([]);
  const [failedIntegrations, setfailedIntegrations] = useState<number[]>([]);
  const [failedApiIds, setFailedApiIds] = useState<number[]>([]);
  const [vehiclesCount, setVehiclesCount] = useState(0);

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
    const combinedData = { ...(initialValues || {}), ...(currentData || {}) };
    console.log('Current Data:', combinedData);
  }, [currentData, initialValues]);

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

  useEffect(() => {
    if (isAccountSaving) {
      if (!isCreatingAccount && !isUpdatingAccount) {
        // setStepsDoneArray((prev) => [...prev, currentStep]);
        setStepsDoneArray((prev) =>
          prev.includes(currentStep) ? prev : [...prev, currentStep]
        );
        setCurrentStep((prev) => Math.min(prev + 1, accountSteps.length - 1));
        setIsAccountSaving(false);
      }
    }
  }, [isAccountSaving, isCreatingAccount, isUpdatingAccount, currentStep]);

  // Temporary console log to show steps done
  useEffect(() => {
    console.log('Steps Done:', stepsDoneArray);
    console.log('Steps Skipped:', stepsSkippedArray);
  }, [stepsDoneArray, stepsSkippedArray]);

  const handleNext = async (data: Account) => {
    console.log('Current Step:', currentStep);
    if (currentStep === 1) {
      setIsAccountSaving(true);
      // if data is null, then create account else update account
      if (initialValues === null) {
        createAccount({ json: data });
      } else {
        const combinedData = { ...initialValues, ...data };
        setCurrentData(combinedData);
        updateAccount({ json: data, param: { accountId: combinedData.$id } });
      }
    }
    if (currentStep === 2) {
      if (initialValues !== null) {
        const combinedData = { ...initialValues, ...data };
        setCurrentData(combinedData);
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
        } else {
          setCurrentStep((prev) => Math.min(prev + 1, accountSteps.length - 1));
          if (failedApiIds.length > 0) {
            // add current step to skipped array if failed API IDs exist
            if (!stepsSkippedArray.includes(currentStep)) {
              setStepsSkippedArray((prev) => [...prev, currentStep]);
            }
          } else {
            // remove current step from skipped array if it was skipped before
            const index = stepsSkippedArray.indexOf(currentStep);
            if (index > -1) {
              stepsSkippedArray.splice(index, 1);
              setStepsSkippedArray(stepsSkippedArray);
            }
            // setStepsDoneArray((prev) => [...prev, currentStep]);
            setStepsDoneArray((prev) =>
              prev.includes(currentStep) ? prev : [...prev, currentStep]
            );
          }
        }
      }
      console.log('Initial Values:', initialValues);
    }
    if (currentStep === 3) {
      // TODO: Adding initial vehicles step
    }
    if (currentStep === 4) {
      // TODO: Adding last step to finish the account creation
    }
    // console log initial values after press skip in step 2
    // if (currentStep === 2 && failedApiIds.length > 0) {
    //   console.log('Initial Values:', initialValues);
    // }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // setIsLoading(true);
    // // Simulating an API call or some async operation
    // setTimeout(() => {
    //   // Route to the integrations page after showing the loading modal for 3 seconds
    //   setIsLoading(false);
    // }, 3000);
  };

  const handleFailedApiIds = (ids: number[]) => {
    console.log('Failed API IDs from:', ids);
    setFailedApiIds(ids);
  };

  return (
    <>
      {/* Step progress pane */}
      <ProgressSidebar currentStep={currentStep} skippedStep={[]} />
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
            onFailedApiIdsChange={handleFailedApiIds}
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
              disabled={isUpdating}
              className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
            >
              {isUpdating ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Updating...
                </>
              ) : currentStep === 4 ? (
                'Finish'
              ) : currentStep === 1 ? (
                'Continue'
              ) : currentStep === 2 ? (
                failedApiIds.length === 0 ? (
                  'Continue'
                ) : (
                  'Skip'
                )
              ) : currentStep === 3 ? (
                vehiclesCount > 0 ? (
                  'Continue'
                ) : (
                  'Skip'
                )
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
