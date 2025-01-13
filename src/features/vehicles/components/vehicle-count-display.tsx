import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface VehicleCountDisplayProps {
  currentCount: number;
  limit: number;
}

const VehicleCountDisplay = ({
  currentCount,
  limit,
}: VehicleCountDisplayProps) => {
  const slotsLeft = Math.max(0, limit - currentCount);
  const percentage = (currentCount / limit) * 100;
  return (
    <Card className='w-full border-none bg-transparent'>
      <CardHeader className='px-0 pb-3'>
        <CardTitle>Vehicle Count</CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm font-medium'>
              {currentCount} / {limit} vehicles
            </span>
            <span className='text-sm font-medium'>
              {slotsLeft} {slotsLeft === 1 ? 'slot' : 'slots'} left
            </span>
          </div>
          <Progress value={percentage} className='w-full' />
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCountDisplay;
