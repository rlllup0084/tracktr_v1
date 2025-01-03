'use client';

import { Card } from '@/components/ui/card';
import { AccountStepProps } from '../interface';
import { AlertCircle, Check, CheckCircle2, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

type Step = 'api-key' | 'check-status' | 'test-connection';

// Mock API validation functions
const validateAPI1 = () =>
  new Promise((resolve) => {
    // TODO: Verify connection to Traccar instance using API URL, Username, and Password
    setTimeout(() => resolve(Math.random() > 0.5), 1500);
  });
const validateAPI2 = () =>
  new Promise((resolve) =>
    {
      // TODO: Verify connection to VIN Decoder Data Provider using API Key
      setTimeout(() => resolve(Math.random() > 0.5), 1500);
    }
  );
const validateAPI3 = () =>
  new Promise((resolve) =>
    {
      // TODO: Implement connection to Fuel Management API provider using API Key (comming soon)
      setTimeout(() => resolve(Math.random() > 0.5), 1500);
    }
  );

// Mock API fix functions
const fixAPI1 = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 2000));
const fixAPI2 = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 2000));
const fixAPI3 = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 2000));

const apiIntegrations = [
  {
    id: 1,
    name: 'Traccar Integration',
    description:
      'Your vehicles are now connected to the Traccar system for real-time GPS tracking.',
    errorMessage:
      'We were unable to verify connection to a Traccar instance. Please check your API URL or your Username and Password.',
    disabled: false,
    learn: '#',
    validateFn: validateAPI1,
    fixFn: fixAPI1,
  },
  {
    id: 2,
    name: 'VIN Decoder Data Provider',
    description: 'Your can now decode VIN data for your vehicles.',
    errorMessage:
      'We were unable to verify connection to a VIN Data Provider. Please check your provided API key.',
    disabled: false,
    learn: '#',
    validateFn: validateAPI2,
    fixFn: fixAPI2,
  },
  {
    id: 3,
    name: 'Fuel Management System',
    description:
      'Integrates with your fuel management provider for seamless fuel usage tracking and expense management.',
    errorMessage:
      'We were unable to verify connection to a Fuel Management API provider. Please check your provided API key.',
    disabled: true,
    learn: '#',
    validateFn: validateAPI3,
    fixFn: fixAPI3,
  },
];

const IntegrationsStep = ({ onSubmit }: AccountStepProps) => {
  const [validationStatus, setValidationStatus] = useState<
    Record<number, 'idle' | 'loading' | 'success' | 'error' | 'fixing'>
  >({});
  const [progress1, setProgress1] = useState<Record<number, number>>({});
  const [overallProgress, setOverallProgress] = useState(0);

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('api-key');
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const validateAllAPIs = async () => {
    setValidationStatus({});
    setProgress1({});
    setOverallProgress(0);

    for (const api of apiIntegrations) {
      await validateAPI(api.id);
    }
  };

  const validateAPI = async (id: number) => {
    setValidationStatus((prev) => ({ ...prev, [id]: 'loading' }));
    setProgress1((prev) => ({ ...prev, [id]: 0 }));

    const progressInterval = setInterval(() => {
      setProgress1((prev) => {
        const newProgress = Math.min((prev[id] || 0) + 10, 90);
        return { ...prev, [id]: newProgress };
      });
    }, 150);

    try {
      const api = apiIntegrations.find((api) => api.id === id);
      if (!api) throw new Error('API not found');
      const result = await api.validateFn();
      setValidationStatus((prev) => ({
        ...prev,
        [id]: result ? 'success' : 'error',
      }));
    } catch (error) {
      console.log(error);
      setValidationStatus((prev) => ({ ...prev, [id]: 'error' }));
    }

    clearInterval(progressInterval);
    setProgress1((prev) => ({ ...prev, [id]: 100 }));

    // Update overall progress
    setOverallProgress((prev) => Math.min(prev + 25, 100));
  };

  const fixAPI = async (id: number) => {
    setValidationStatus((prev) => ({ ...prev, [id]: 'fixing' }));
    setProgress1((prev) => ({ ...prev, [id]: 0 }));

    const progressInterval = setInterval(() => {
      setProgress1((prev) => {
        const newProgress = Math.min((prev[id] || 0) + 5, 90);
        return { ...prev, [id]: newProgress };
      });
    }, 100);

    try {
      const api = apiIntegrations.find((api) => api.id === id);
      if (!api) throw new Error('API not found');
      await api.fixFn();
      await validateAPI(id);
    } catch (error) {
      console.log(error);
      setValidationStatus((prev) => ({ ...prev, [id]: 'error' }));
    }

    clearInterval(progressInterval);
  };

  useEffect(() => {
    validateAllAPIs();
  }, []);

  useEffect(() => {
    if (isChecking && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isChecking, progress]);

  const handleUpdateApiKey = () => {
    setCurrentStep('check-status');
    setIsChecking(true);
  };

  return (
    <>
      <div>
        <div className='mt-8 space-y-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            Integration Check
          </h1>
          <p className='text-gray-400'>
            We&apos;re automatically checking your integrations to ensure
            everything is set up correctly. This process may take a few moments.
          </p>
        </div>

        <div className='mt-8 space-y-4'>
          {/* Traccar Integration - Success */}
          <Card className='bg-zinc-900/50 border-zinc-800 p-4'>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-zinc-800 p-2'>
                <CheckCircle2 className='h-6 w-6 text-green-500' />
              </div>
              <div className='flex-1'>
                <h3 className='text-sm font-medium text-white'>
                  Traccar Integration
                </h3>
                <p className='text-sm text-gray-400'>
                  Your vehicles are now connected to the Traccar system for
                  real-time GPS tracking.
                </p>
              </div>
            </div>
          </Card>

          {/* API Key - Error */}
          {/* TODO: Use this as a template */}
          <Card className='bg-zinc-900/50 border-zinc-800 p-4 border-red-900/50'>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-zinc-800 p-2'>
                <AlertCircle className='h-6 w-6 text-red-500' />
              </div>
              <div className='flex-1'>
                <h3 className='text-sm font-medium text-white'>
                  API Key for Data Provider
                </h3>
                <p className='text-sm text-gray-400 mb-3'>
                  We were unable to verify your API key. Please update the key
                  to ensure data synchronization with third-party services.
                </p>
                <div className='flex gap-3'>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='text-xs'
                    onClick={() => setShowResolveModal(true)}
                  >
                    Resolve Issue
                  </Button>
                  <Button variant='ghost' size='sm' className='text-xs'>
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Fuel Management - Loading */}
          <Card className='bg-zinc-900/50 border-zinc-800 p-4'>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-zinc-800 p-2'>
                <Zap className='h-6 w-6 text-gray-400 animate-pulse' />
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-sm font-medium text-white'>
                    Fuel Management System
                  </h3>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent'></div>
                </div>
                <p className='text-sm text-gray-400'>
                  Integrates with your fuel management provider for seamless
                  fuel usage tracking and expense management.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <p className='mt-6 text-sm text-gray-400'>
          For any failed integration, click &quot;Resolve Issue&quot; to view
          troubleshooting options or update credentials.
        </p>
      </div>

      {/* Resolve Issue Modal */}
      {showResolveModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setShowResolveModal(false)}
          ></div>
          <Card className='w-full max-w-lg bg-zinc-900/50 border-zinc-800 z-10'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-zinc-800 p-2'>
                    <AlertCircle className='h-6 w-6 text-red-500' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold text-white'>
                      Resolve Issue for VIN Decoder API
                    </h2>
                    <p className='text-sm text-gray-400'>
                      We&apos;ve detected a problem with the VIN Decoder API
                      integration. Please follow the steps below to resolve the
                      issue.
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-400 hover:text-white'
                  onClick={() => setShowResolveModal(false)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              <div className='relative mb-8'>
                <div className='absolute left-0 top-3 w-full h-px bg-gray-800'></div>
                <div className='relative flex justify-between'>
                  {[
                    {
                      title: 'Check Your API Key',
                      subtitle: 'You can update your API key below',
                      step: 'api-key',
                    },
                    {
                      title: 'Check API Status',
                      subtitle: 'Checking VIN Decoder service availability',
                      step: 'check-status',
                    },
                    {
                      title: 'Test Connection',
                      subtitle: 'Test the connection again to verify',
                      step: 'test-connection',
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className='flex flex-col items-center text-center w-1/3'
                    >
                      <div
                        className={`w-6 h-6 rounded-full mb-2 flex items-center justify-center z-10 
                        ${
                          currentStep === step.step
                            ? 'bg-white'
                            : currentStep === 'check-status' &&
                              step.step === 'api-key'
                            ? 'bg-green-500'
                            : 'bg-zinc-800'
                        }`}
                      >
                        {currentStep === 'check-status' &&
                        step.step === 'api-key' ? (
                          <Check className='h-3 w-3 text-white' />
                        ) : (
                          <div
                            className={`w-2 h-2 rounded-full 
                            ${
                              currentStep === step.step
                                ? 'bg-zinc-900'
                                : 'bg-zinc-600'
                            }`}
                          ></div>
                        )}
                      </div>
                      <div className='space-y-1'>
                        <p className='text-xs font-medium text-white'>
                          {step.title}
                        </p>
                        <p className='text-xs text-gray-400'>{step.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {currentStep === 'api-key' ? (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='api-key'
                      className='block text-sm font-medium text-white'
                    >
                      API Key *
                    </label>
                    <Input
                      id='api-key'
                      placeholder='Your API Key'
                      className='bg-gray-800 border-gray-700'
                    />
                  </div>
                  <Button
                    className='w-full bg-gray-600 hover:bg-gray-500'
                    onClick={handleUpdateApiKey}
                  >
                    Update API Key
                  </Button>
                </div>
              ) : (
                currentStep === 'check-status' && (
                  <div className='flex flex-col items-center justify-center py-8'>
                    <div className='relative w-32 h-32'>
                      <svg className='w-full h-full transform -rotate-90'>
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          className='stroke-gray-800'
                          strokeWidth='8'
                          fill='none'
                        />
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          className='stroke-white'
                          strokeWidth='8'
                          fill='none'
                          strokeLinecap='round'
                          strokeDasharray={2 * Math.PI * 56}
                          strokeDashoffset={
                            2 * Math.PI * 56 * (1 - progress / 100)
                          }
                          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                        />
                      </svg>
                      <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <span className='text-sm text-gray-400'>Checking</span>
                        <span className='text-2xl font-bold text-white'>
                          {progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default IntegrationsStep;
