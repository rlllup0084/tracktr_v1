'use client';

import { Card } from '@/components/ui/card';
import { AccountStepProps } from '../interface';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { use, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateVinDecoderSchema } from '../schema';
import { z } from 'zod';
import { Account } from '../types';

type Step = 'api-key' | 'check-status' | 'test-connection';

// Mock API validation functions
const validateAPI1 = () =>
  new Promise((resolve) => {
    // TODO: Verify connection to Traccar instance using API URL, Username, and Password
    setTimeout(() => resolve(Math.random() > 0.5), 1500);
  });
const validateAPI2 = () =>
  new Promise((resolve) => {
    // TODO: Verify connection to VIN Decoder Data Provider using API Key
    setTimeout(() => resolve(Math.random() > 0.5), 1500);
  });

// Mock API fix functions
const fixAPI1 = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 2000));
const fixAPI2 = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 2000));

const apiIntegrations = [
  {
    id: 1,
    name: 'Traccar Integration',
    description:
      'Connect your vehicles to the Traccar API instance for real-time GPS tracking, telematics and monitoring.',
    successMessage:
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
    description:
      'Connect to a VIN Data provider to decode and retrieve detailed information about your vehicles using their VIN numbers.',
    successMessage: 'You can now decode VIN data for your vehicles.',
    errorMessage:
      'We were unable to verify connection to a VIN Data Provider. Please check your provided API key.',
    disabled: false,
    learn: '#',
    validateFn: validateAPI2,
    fixFn: fixAPI2,
  },
];

const IntegrationsStep = ({ onSubmit, isUpdating, data }: AccountStepProps) => {
  const [validationStatus, setValidationStatus] = useState<
    Record<number, 'idle' | 'loading' | 'success' | 'error' | 'fixing'>
  >({});
  const [progress1, setProgress1] = useState<Record<number, number>>({});
  const [overallProgress, setOverallProgress] = useState(0);

  const [showResolveTraccarModal, setShowResolveTraccarModal] = useState(false);
  const [showResolveVinModal, setShowResolveVinModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('api-key');
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const formVin = useForm<z.infer<typeof updateVinDecoderSchema>>({
    resolver: zodResolver(updateVinDecoderSchema),
    defaultValues: {
      ...data,
      vin_decoder_key: '',
    },
  });

  const previousDataRef = useRef<typeof data | null>(null);

  useEffect(() => {
    console.log('Initial Data', data);

    if (previousDataRef.current && data) {
      const changedAttributes = Object.keys(data).filter(key => {
        return previousDataRef.current && data[key] !== previousDataRef.current[key];
      });

      if (changedAttributes.length > 0) {
        console.log('Changed attributes:', changedAttributes);
        changedAttributes.forEach(async attr => {
          if (previousDataRef.current) {
            if (attr === 'vin_decoder_key') {
              // console.log(`Attribute ${attr} changed from ${previousDataRef.current[attr]} to ${data[attr]}`);
              setShowResolveVinModal(false);
              await validateAPI(2);
            }
          }
        });
      }
    }
  
    previousDataRef.current = data;
  }, [data]);
  
  // Populate the form with the initial data
  useEffect(() => {
    if (data) {
      formVin.reset(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // TODO: Code to verify connection to Traccar instance using API URL, Username, and Password
  // const verifyTraccarConnection = async (apiUrl: string, username: string, password: string) => {
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Basic ' + btoa(`${username}:${password}`),
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to connect to Traccar instance');
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error('Error verifying Traccar connection:', error);
  //     return false;
  //   }
  // };

  // TODO: Code to verify connection to VIN Decoder Data Provider using API Key
  // const verifyVinDecoderConnection = async (apiKey: string) => {
  //   try {
  //     const response = await fetch(`https://auto.dev/api/vin/ZPBUA1ZL9KLA00848?apikey=${apiKey}`, {
  //       method: 'GET',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to connect to VIN Decoder API');
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error('Error verifying VIN Decoder connection:', error);
  //     return false;
  //   }
  // };

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

  // TODO: If fixAPI is called, the showResolveModal state should be set to true
  const fixAPI = async (id: number) => {
    switch (id) {
      case 1:
        await fixAPI1();
        break;
      case 2:
        setShowResolveVinModal(true);
        break;
    }
  };

  useEffect(() => {
    console.log('showResolveVinModal', showResolveVinModal);
  }, [showResolveVinModal])

    // const originalFixAPI = fixAPI;

  // const fixAPI = async (id: number) => {
  //   setValidationStatus((prev) => ({ ...prev, [id]: 'fixing' }));
  //   setProgress1((prev) => ({ ...prev, [id]: 0 }));

  //   const progressInterval = setInterval(() => {
  //     setProgress1((prev) => {
  //       const newProgress = Math.min((prev[id] || 0) + 5, 90);
  //       return { ...prev, [id]: newProgress };
  //     });
  //   }, 100);

  //   try {
  //     const api = apiIntegrations.find((api) => api.id === id);
  //     if (!api) throw new Error('API not found');
  //     await api.fixFn();
  //     await validateAPI(id);
  //   } catch (error) {
  //     console.log(error);
  //     setValidationStatus((prev) => ({ ...prev, [id]: 'error' }));
  //   }

  //   clearInterval(progressInterval);
  // };

  useEffect(() => {
    validateAllAPIs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log('Update API Key');
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
          {apiIntegrations.map((api) => (
            <Card
              key={api.id}
              className={`bg-zinc-900/50 p-4 ${
                validationStatus[api.id] === 'error'
                  ? 'border-red-900/50'
                  : 'border-zinc-800'
              }`}
            >
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-zinc-800 p-2'>
                  {validationStatus[api.id] === 'success' ? (
                    <CheckCircle2 className='h-6 w-6 text-green-500' />
                  ) : validationStatus[api.id] === 'error' ? (
                    <AlertCircle className='h-6 w-6 text-red-500' />
                  ) : (
                    <Zap className='h-6 w-6 text-gray-400 animate-pulse' />
                  )}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-sm font-medium text-white'>
                      {api.name}
                    </h3>
                    {validationStatus[api.id] === 'loading' ? (
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent'></div>
                    ) : validationStatus[api.id] === 'fixing' ? (
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent'></div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className='text-sm text-gray-400 mb-3'>
                    {validationStatus[api.id] === 'loading'
                      ? api.description
                      : validationStatus[api.id] === 'error'
                      ? api.errorMessage
                      : validationStatus[api.id] === 'success'
                      ? api.successMessage
                      : api.description}
                  </p>
                  {validationStatus[api.id] === 'error' && (
                    <div className='flex gap-3'>
                      <Button
                        variant='secondary'
                        size='sm'
                        className='text-xs'
                        onClick={() => fixAPI(api.id)}
                      >
                        Resolve Issue
                      </Button>
                      <Button variant='ghost' size='sm' className='text-xs'>
                        Learn more
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* New Integration Coming Soon */}
          <Card className='bg-zinc-900/50 border-zinc-800 p-4'>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-zinc-800 p-2'>
                <Clock className='h-6 w-6 text-yellow-500' />
              </div>
              <div className='flex-1'>
                <h3 className='text-sm font-medium text-white'>
                  Fuel Management System
                  <Badge className='ml-2 px-2 rounded-full bg-yellow-500 text-gray-900'>
                    Coming Soon
                  </Badge>
                </h3>
                <p className='text-sm text-gray-400 mb-3'>
                  We&apos;re working on an exciting new fuel management system
                  provider for seamless fuel usage tracking and expense
                  management. Stay tuned!
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

      {/* Resolve Vin Issue Modal */}
      {showResolveVinModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setShowResolveVinModal(false)}
          ></div>
          <Card className='w-full max-w-lg bg-zinc-900/50 border-zinc-800 z-10'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-6'>
                <div className='flex items-start gap-3'>
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
                  onClick={() => setShowResolveVinModal(false)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              <Form {...formVin}>
                <form
                  onSubmit={formVin.handleSubmit(onSubmit)}
                  className='space-y-2'
                >
                  <FormField
                    control={formVin.control}
                    name='vin_decoder_key'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key *</FormLabel>
                        <FormControl>
                          <Input placeholder='Your API Key' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='pt-2'>
                    <Button
                      type='submit'
                      className='w-full h-12 px-6 py-3 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white text-md font-semibold rounded-md transition duration-200'
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                          Updating...
                        </>
                      ) : (
                        'Update API Key'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              {/* <label
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
                  </Button> */}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default IntegrationsStep;
