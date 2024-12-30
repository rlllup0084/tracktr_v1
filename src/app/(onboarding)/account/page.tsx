'use client'

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccountStep, accountSteps } from '@/features/onboarding/accountSteps';
import {
  CheckCircle2,
  Circle,
  Github,
  Linkedin,
  Loader2,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

enum FleetSize {
    XS = "< 5",
    S = "6 - 10",
    M = "11 - 20",
    L = "21 - 50",
    XL = "51 - 100",
    XXL = "101 - 500",
    XXXL = "501 - 1000",
    XXXXL = "> 1000"
  }

const AccountPage = () => {
    const [selectedFleetSize, setSelectedFleetSize] = useState<FleetSize | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulating an API call or some async operation
        setTimeout(() => {
          // Route to the integrations page after showing the loading modal for 3 seconds
          router.push('/onboarding/integrations');
        }, 3000);
      }

  return (
    <div className='flex flex-col lg:flex-row max-w-7xl m-auto min-h-[calc(100vh-4rem)] text-white'>
      {/* Step progress pane */}
      <div className='w-full lg:w-80 flex-shrink-0 bg-zinc-900/50 p-6 flex flex-col items-center lg:items-start'>
        <div className='space-y-6 w-full text-center lg:text-left'>
          <h2 className='text-xl font-semibold text-white'>
            Initialization progress
          </h2>
          <p className='text-sm text-gray-400'>
            Complete the steps to set up your account, configure vehicles, and
            integrate with key systems.
          </p>

          <ul className='flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-4 lg:space-x-0 lg:space-y-4 relative pb-4 lg:pb-0 before:hidden lg:before:block before:absolute before:left-1/2 lg:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-gray-700 justify-center lg:justify-start items-center lg:items-start'>
            {accountSteps.map((step: AccountStep, index, array) => (
              <li
                key={index}
                className='relative flex flex-col lg:flex-row items-center lg:items-start pb-0 lg:pb-8 last:pb-0 flex-shrink-0 lg:flex-shrink w-24 lg:w-full'
              >
                <div className='flex h-6 w-6 shrink-0 items-center justify-center relative z-10 bg-gray-900'>
                  {step.status === 'complete' ? (
                    <CheckCircle2 className='h-6 w-6 text-green-500' />
                  ) : step.status === 'current' ? (
                    <div className='h-4 w-4 rounded-full bg-white' />
                  ) : (
                    <Circle className='h-6 w-6 text-gray-400' />
                  )}
                </div>
                <div className='mt-2 lg:mt-0 lg:ml-4 text-center lg:text-left'>
                  <p
                    className={`text-xs lg:text-sm font-medium ${
                      step.status === 'pending' ? 'text-gray-400' : 'text-white'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className='hidden lg:block text-xs text-gray-400'>
                    {step.description}
                  </p>
                </div>
                {index < array.length - 1 && (
                  <div className='absolute top-3 left-[calc(50%+12px)] w-[calc(100%-24px)] h-px bg-gray-700 lg:hidden'></div>
                )}
              </li>
            ))}
          </ul>

          <div className='mt-6 flex justify-center lg:justify-start space-x-4 w-full'>
            <Link href='#' className='text-gray-400 hover:text-white'>
              <Twitter className='h-5 w-5' />
            </Link>
            <Link href='#' className='text-gray-400 hover:text-white'>
              <Linkedin className='h-5 w-5' />
            </Link>
            <Link href='#' className='text-gray-400 hover:text-white'>
              <Youtube className='h-5 w-5' />
            </Link>
            <Link href='#' className='text-gray-400 hover:text-white'>
              <Github className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
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
          <div className="mt-8 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Tell Us About Your Company</h1>
            <p className="text-gray-400">
              Help us understand your team better so we can customize your TrackTr experience.
            </p>
          </div>
          <Card className="mt-8 bg-gray-900/50 border-gray-800">
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company or Organization Name *
                  </label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    How many asset do you have in your fleet?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.values(FleetSize).map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant="outline"
                        className={`border-gray-700 hover:bg-gray-800 hover:text-white ${selectedFleetSize === size ? 'bg-gray-800 text-white' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedFleetSize(size);
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    What is your company primary industry?
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="mining">Mining</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    What is your role in the company?
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Fleet Manager</SelectItem>
                      <SelectItem value="operator">Fleet Operator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox id="demo" className="mt-1" />
                  <div>
                    <label htmlFor="demo" className="block text-sm font-medium text-white">
                      Enable Demo Data
                    </label>
                    <p className="text-sm text-gray-400">
                      Install demo data to explore TrackTr? You can remove it later in the settings when ready for live use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  By sharing a few details, we can tailor the platform to suit your company&apos;s needs and help you get the most out of TrackTr.
                </p>
                <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-500">
                  Continue
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      {/* Modal Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <Card className="w-full max-w-md bg-gray-900/50 border-gray-800 z-10">
            <div className="p-6 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <h2 className="text-xl font-semibold text-white text-center">
                Preparing your account...
              </h2>
              <p className="text-sm text-gray-400 text-center">
                We&apos;re setting up your account so you can start adding vehicles to your fleet. This may take a moment. Once complete, you&apos;ll be able to configure your vehicles and explore all TrackTr features.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
