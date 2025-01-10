'use client';

import { Card } from '@/components/ui/card';
import { AccountStepProps } from '../interface';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
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
import {
  dummySchema,
  updateTraccarIntegrationSchema,
  updateVinDecoderSchema,
} from '../schema';
import { z } from 'zod';

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
  },
];

const IntegrationsStep = ({ onSubmit, isUpdating, data }: AccountStepProps) => {
  const [validationStatus, setValidationStatus] = useState<
    Record<number, 'idle' | 'loading' | 'success' | 'error' | 'fixing'>
  >({});

  const [showResolveTraccarModal, setShowResolveTraccarModal] = useState(false);
  const [showResolveVinModal, setShowResolveVinModal] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const formDummy = useForm<z.infer<typeof dummySchema>>({
    resolver: zodResolver(dummySchema),
    defaultValues: {
      dummy: '',
    },
  });

  const formVin = useForm<z.infer<typeof updateVinDecoderSchema>>({
    resolver: zodResolver(updateVinDecoderSchema),
    defaultValues: {
      vin_decoder_key: '',
    },
  });

  const formTraccar = useForm<z.infer<typeof updateTraccarIntegrationSchema>>({
    resolver: zodResolver(updateTraccarIntegrationSchema),
    defaultValues: {
      traccar_api: '',
      username: '',
      password: '',
    },
  });

  const previousDataRef = useRef<typeof data | null>(null);

  useEffect(() => {
    if (previousDataRef.current && data) {
      const changedAttributes = Object.keys(data).filter((key) => {
        return (
          previousDataRef.current && data[key] !== previousDataRef.current[key]
        );
      });

      if (changedAttributes.length > 0) {
        console.log('Changed attributes:', changedAttributes);
        changedAttributes.forEach(async (attr) => {
          if (previousDataRef.current) {
            if (['traccar_api_token', 'traccar_api'].includes(attr)) {
              setShowResolveTraccarModal(false);
              await validateAPI(1);
            }
            if (attr === 'vin_decoder_key') {
              setShowResolveVinModal(false);
              await validateAPI(2);
            }
          }
        });
      }
    }

    previousDataRef.current = data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      const { username, password } = decryptBase64(data.traccar_api_token);
      formTraccar.reset({
        traccar_api: data.traccar_api || '',
        username: username || '',
        password: password || '',
      });
      formVin.reset({ vin_decoder_key: data.vin_decoder_key || '' });

      if (!hasRun) {
        validateAllAPIs();
        setHasRun(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!isUpdating && previousDataRef.current) {
      setShowResolveTraccarModal(false);
      setShowResolveVinModal(false);
    }
  }, [isUpdating]);

  const validateAllAPIs = async () => {
    setValidationStatus({});

    for (const api of apiIntegrations) {
      await validateAPI(api.id);
    }
  };

  const decryptBase64 = (encoded: string) => {
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    return { username, password };
  };

  const validateAPI = async (id: number) => {
    setValidationStatus((prev) => ({ ...prev, [id]: 'loading' }));

    switch (id) {
      case 1:
        console.log('Validating Traccar API');
        if (!data['traccar_api_token']) {
          setValidationStatus((prev) => ({ ...prev, [id]: 'error' }));
        } else {
          const { username, password } = decryptBase64(
            data['traccar_api_token']
          );
          verifyTraccarConnection(data['traccar_api'], username, password).then(
            (result) => {
              console.log('Valid Call', result);
              setValidationStatus((prev) => ({
                ...prev,
                [id]: result ? 'success' : 'error',
              }));
            }
          );
        }
        break;
      case 2:
        console.log('Validating VIN Decoder API');
        if (!data['vin_decoder_key']) {
          setValidationStatus((prev) => ({ ...prev, [id]: 'error' }));
        } else {
          verifyVinDecoderConnection(data['vin_decoder_key']).then((result) => {
            console.log('Valid Call', result);
            setValidationStatus((prev) => ({
              ...prev,
              [id]: result ? 'success' : 'error',
            }));
          });
        }
        break;
    }
  };

  const verifyTraccarConnection = async (
    apiUrl: string,
    username: string,
    password: string
  ) => {
    try {
      const bearerToken = btoa(`${username}:${password}`);
      const response = await fetch(
        `/api/proxy/api/devices?target=${apiUrl}&token=${bearerToken}&authType=basic`,
        {
          method: 'GET',
          credentials: 'omit',
        }
      );
      if (!response.ok) {
        console.log('Failed to connect to Traccar instance');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error verifying Traccar connection:', error);
      return false;
    }
  };

  const verifyVinDecoderConnection = async (apiKey: string) => {
    try {
      const response = await fetch(
        `/api/proxy/api/vin/ZPBUA1ZL9KLA00848?target=https://auto.dev/api&token=${apiKey}&authType=bearer`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        console.log('Failed to connect to VIN Decoder API');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error verifying VIN Decoder connection:', error);
      return false;
    }
  };

  const fixAPI = async (id: number) => {
    switch (id) {
      case 1:
        setShowResolveTraccarModal(true);
        break;
      case 2:
        setShowResolveVinModal(true);
        break;
    }
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

        {/* TODO: Create a dummy Form here that could trigger onSubmit */}
        <Form {...formDummy}>
          <form onSubmit={formDummy.handleSubmit(onSubmit)} id='step-3-form'>
            {/* Dummy only to trigger onSubmit */}
          </form>
        </Form>

        <p className='mt-6 text-sm text-gray-400'>
          For any failed integration, click &quot;Resolve Issue&quot; to view
          troubleshooting options or update credentials.
        </p>
      </div>

      {/* Resolve Traccar Issue Modal */}
      {showResolveTraccarModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setShowResolveTraccarModal(false)}
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
                      Resolve Issue for Traccar API
                    </h2>
                    <p className='text-sm text-gray-400'>
                      We&apos;ve detected a problem with the Traccar API
                      integration. Please follow the steps below to resolve the
                      issue.
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-400 hover:text-white'
                  onClick={() => setShowResolveTraccarModal(false)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              <Form {...formTraccar}>
                <form
                  onSubmit={formTraccar.handleSubmit(onSubmit)}
                  className='space-y-2'
                >
                  <FormField
                    control={formTraccar.control}
                    name='traccar_api'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traccar API URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Your Traccar API URL'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formTraccar.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your username' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formTraccar.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='Enter your password'
                            {...field}
                          />
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
                        'Update API Information'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Card>
        </div>
      )}

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
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default IntegrationsStep;
