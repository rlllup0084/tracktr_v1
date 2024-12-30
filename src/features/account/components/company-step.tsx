import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

enum FleetSize {
  XS = '< 5',
  S = '6 - 10',
  M = '11 - 20',
  L = '21 - 50',
  XL = '51 - 100',
  XXL = '101 - 500',
  XXXL = '501 - 1000',
  XXXXL = '> 1000',
}

interface CompanyStepProps {
  onLoadingChange: (loading: boolean) => void;
}

const CompanyStep = ({ onLoadingChange }: CompanyStepProps) => {
  const [selectedFleetSize, setSelectedFleetSize] = useState<FleetSize | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoadingChange(true);
    // Simulating an API call or some async operation
    setTimeout(() => {
      // Route to the integrations page after showing the loading modal for 3 seconds
      onLoadingChange(false);
    }, 3000);
  };
  return (
    <>
      <div className='mt-8 space-y-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-white'>
          Tell Us About Your Company
        </h1>
        <p className='text-gray-400'>
          Help us understand your team better so we can customize your TrackTr
          experience.
        </p>
      </div>
      <Card className='mt-8 bg-gray-900/50 border-gray-800'>
        <form className='p-6 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='company'
                className='block text-sm font-medium text-white mb-2'
              >
                Company or Organization Name *
              </label>
              <Input
                id='company'
                placeholder='Company name'
                className='bg-gray-800 border-gray-700'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-white mb-2'>
                How many asset do you have in your fleet?
              </label>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {Object.values(FleetSize).map((size) => (
                  <Button
                    key={size}
                    type='button'
                    variant='outline'
                    className={`border-gray-700 hover:bg-gray-800 hover:text-white ${
                      selectedFleetSize === size ? 'bg-gray-800 text-white' : ''
                    }`}
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
              <label className='block text-sm font-medium text-white mb-2'>
                What is your company primary industry?
              </label>
              <Select>
                <SelectTrigger className='bg-gray-800 border-gray-700'>
                  <SelectValue placeholder='Select industry' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='logistics'>
                    Logistics & Transportation
                  </SelectItem>
                  <SelectItem value='construction'>Construction</SelectItem>
                  <SelectItem value='agriculture'>Agriculture</SelectItem>
                  <SelectItem value='mining'>Mining</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='block text-sm font-medium text-white mb-2'>
                What is your role in the company?
              </label>
              <Select>
                <SelectTrigger className='bg-gray-800 border-gray-700'>
                  <SelectValue placeholder='Select role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='owner'>Owner</SelectItem>
                  <SelectItem value='manager'>Fleet Manager</SelectItem>
                  <SelectItem value='operator'>Fleet Operator</SelectItem>
                  <SelectItem value='admin'>Administrator</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex items-start space-x-3 pt-4'>
              <Checkbox id='demo' className='mt-1' />
              <div>
                <label
                  htmlFor='demo'
                  className='block text-sm font-medium text-white'
                >
                  Enable Demo Data
                </label>
                <p className='text-sm text-gray-400'>
                  Install demo data to explore TrackTr? You can remove it later
                  in the settings when ready for live use.
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <p className='text-sm text-gray-400'>
              By sharing a few details, we can tailor the platform to suit your
              company&apos;s needs and help you get the most out of TrackTr.
            </p>
            <Button
              type='submit'
              className='w-full bg-gray-600 hover:bg-gray-500'
            >
              Continue
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CompanyStep;
