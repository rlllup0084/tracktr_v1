import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PreparingAccountOverlayProps {
  loading: boolean;
}

const PreparingAccountOverlay = ({ loading }: PreparingAccountOverlayProps) => {
  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>
          <Card className='w-full max-w-md bg-zinc-900/50 border-zinc-800 z-10'>
            <div className='p-6 flex flex-col items-center justify-center space-y-4'>
              <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
              <h2 className='text-xl font-semibold text-white text-center'>
                Preparing your account...
              </h2>
              <p className='text-sm text-gray-400 text-center'>
                We&apos;re setting up your account so you can start adding
                vehicles to your fleet. This may take a moment. Once complete,
                you&apos;ll be able to configure your vehicles and explore all
                TrackTr features.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PreparingAccountOverlay;
