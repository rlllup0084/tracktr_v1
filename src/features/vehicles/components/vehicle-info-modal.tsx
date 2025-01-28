'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  VinVehicleData,
  vinVehicleDataSchema,
} from '../utils/parseVehicleData';
import { Check, Edit2, Truck } from 'lucide-react';
import { SpecItem } from '../interfaces';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const VehicleInfoModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: VinVehicleData;
  onConfirm: (data: VinVehicleData) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const vehicleSpecs: SpecItem[] = [
    {
      label: 'Vehicle Name',
      value: `${data.years?.[0]?.year ?? ''} ${data.make?.name ?? ''} ${
        data.model?.name ?? ''
      }`,
      valueType: 'input',
    }, // ok 2009 Chevrolet Silverado 1500 XFE
    { label: 'VIN', value: `${data.vin}`, valueType: 'input' }, // ok 1GCEC29J09Z152000
    { label: 'Make', value: `${data.make?.name ?? ''}`, valueType: 'input' }, // ok Chevrolet
    { label: 'Model', value: `${data.model?.name ?? ''}`, valueType: 'input' }, // ok Silverado 1500
    {
      label: 'Year',
      value: `${data.years?.[0]?.year ?? ''}`,
      valueType: 'input',
    }, // 2009
    // TODO: Pick style from the list of styles
    {
      label: 'Style',
      value: `${data.years?.[0]?.styles}`,
      valueType: 'selection',
    }, // XFE
    /* 
      TODO: If style selected, populate style detail object: 
      {
        "id": 101060059,
        "name": "LT 4dr Extended Cab 6.5 ft. SB (4.8L 8cyl 4A)",
        "submodel": {
            "body": "Extended Cab", -->> to populate Body Type
            "modelName": "Silverado 1500 Extended Cab",
            "niceName": "extended-cab"
          },
          "trim": "LT" -->> to populate Trim
      } 
    */
    { label: 'Body Type', valueType: 'input' }, // Crew Cab
    { label: 'Trim', valueType: 'input' }, // XFE

    {
      label: 'Vehicle Type',
      value: `${data.categories?.vehicleType ?? ''}`,
      valueType: 'input',
    }, // Truck
    {
      label: 'Vehicle Style',
      value: `${data.categories?.vehicleStyle ?? ''}`,
      valueType: 'input',
    }, // Crew Cab Pickup
    {
      label: 'Drive Type',
      value: `${data.drivenWheels ?? ''}`,
      valueType: 'input',
    }, // Rear-wheel drive (RWD)
    {
      label: 'Number of Doors',
      value: `${data.numOfDoors ?? ''}`,
      valueType: 'input',
    }, // 4
    {
      label: 'Primary Body Type',
      value: `${data.categories?.primaryBodyType ?? ''}`,
      valueType: 'input',
    }, // Truck
    {
      label: 'Vehicle Size',
      value: `${data.categories?.vehicleSize ?? ''}`,
      valueType: 'input',
    }, // Large
    {
      label: 'Market Class',
      value: `${data.categories?.market ?? ''}`,
      valueType: 'input',
    }, // Flex Fuel
    {
      label: 'EPA Class',
      value: `${data.categories?.epaClass ?? ''}`,
      valueType: 'input',
    }, // Standard Pickup Trucks
    // --------------------------------------------------------
    {
      label: 'Engine Name',
      value: `${data.engine?.name ?? ''} ${data.engine?.configuration ?? ''} ${
        data.engine?.cylinder ?? ''
      }`,
      valueType: 'input',
    }, // Engine (5.3L V8)
    {
      label: 'Engine Type',
      value: `${data.engine?.type ?? ''}`,
      valueType: 'input',
    }, // Flex-fuel (unleaded/E85)
    {
      label: 'Horsepower',
      value: `${data.engine?.horsepower ?? ''}`,
      valueType: 'input',
    }, // 315 hp @ 5200 rpm
    {
      label: 'Torque',
      value: `${data.engine?.torque ?? ''}`,
      valueType: 'input',
    }, // 338 lb-ft @ 4400 rpm
    {
      label: 'Cylinders',
      value: `${data.engine?.cylinder ?? ''}`,
      valueType: 'input',
    }, // 8
    {
      label: 'Displacement',
      value: `${data.engine?.displacement ?? ''}`,
      valueType: 'input',
    }, // 5.3L (5328 cc)
    {
      label: 'Fuel Type',
      value: `${data.engine?.fuelType ?? ''}`,
      valueType: 'input',
    }, // Flex-fuel (unleaded/E85)
    {
      label: 'Compression Ratio',
      value: `${data.engine?.compressionRatio ?? ''}`,
      valueType: 'input',
    }, // 9.9
    {
      label: 'Compressor Type',
      value: `${data.engine?.compressorType ?? ''}`,
      valueType: 'input',
    }, // Compressor Type
    {
      label: 'Engine Configuration',
      value: `${data.engine?.configuration ?? ''}`,
      valueType: 'input',
    }, // V8
    {
      label: 'Engine Code',
      value: `${data.engine?.code ?? ''}`,
      valueType: 'input',
    }, // 8VNAF5.3
    { label: 'Manufacturer Engine Code', valueType: 'input' }, // Engine Manufacturer
    { label: 'Fuel Capacity', valueType: 'input' }, // Fuel Capacity
    {
      label: 'RPM (Horsepower)',
      value: `${data.engine?.rpm?.horsepower ?? ''}`,
      valueType: 'input',
    }, // 5200
    {
      label: 'RPM (Torque)',
      value: `${data.engine?.rpm?.torque ?? ''}`,
      valueType: 'input',
    }, // 5200
    {
      label: 'Fuel Capacity',
      valueType: 'input',
    }, // eg. 20 gal or 20 L
    {
      label: 'Valve Timing',
      value: `${data.engine?.valve?.timing ?? ''}`,
      valueType: 'input',
    }, // Valve Timing
    {
      label: 'Valve Gear',
      value: `${data.engine?.valve?.gear ?? ''}`,
      valueType: 'input',
    }, // Overhead valve
    {
      label: 'Total Valves',
      value: `${data.engine?.totalValves ?? ''}`,
      valueType: 'input',
    }, // 16
    {
      label: 'Transmission Type',
      value: `${data.transmission?.transmissionType ?? ''}`,
      valueType: 'input',
    }, // Automatic
    {
      label: 'Number of Speeds',
      value: `${data.transmission?.numberOfSpeeds ?? ''}`,
      valueType: 'input',
    }, // 6
    {
      label: 'Transmission Name',
      value: `${data.transmission?.name ?? ''}`,
      valueType: 'input',
    }, // Transmission Name
    { label: 'City MPG', value: `${data.mpg?.city ?? ''}`, valueType: 'input' }, // 15
    {
      label: 'Highway MPG',
      value: `${data.mpg?.highway ?? ''}`,
      valueType: 'input',
    }, // 21
  ];

  const form = useForm<VinVehicleData>({
    resolver: zodResolver(vinVehicleDataSchema),
    defaultValues: data,
  });

  // function onSubmit(values: VinVehicleData) {
  //   onConfirm(values);
  //   setIsEditing(false);
  // }

  const handleSubmit = (data: VinVehicleData) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      onConfirm(data);
      // onClose(false)
    }
  };

// If vehicleData changes, reset selected style, body type, and trim
  useEffect(() => {
    setSelectedStyle('');
    setSelectedBodyType('N/A');
    setSelectedTrim('N/A');
  }, [data]);

  // Store selected style in state
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('N/A');
  const [selectedTrim, setSelectedTrim] = useState('N/A');

  // Function to update body type and trim when style changes
  const handleStyleChange = (styleName: string) => {
    setSelectedStyle(styleName);
    const selectedStyleData = data.years?.[0]?.styles?.find(
      (style) => style.name === styleName
    );
    console.log('Selected style data:', selectedStyleData);
    if (selectedStyleData?.submodel?.body) {
      setSelectedBodyType(selectedStyleData.submodel.body);
    }
    if (selectedStyleData?.trim) {
      setSelectedTrim(selectedStyleData.trim);
    }
  };

  /* 
  const SpecList: React.FC<{ specs: SpecItem[] }> = ({ specs }) => (
  <div className="space-y-2">
    {specs.map((spec, index) => (
      <div key={index} className="flex justify-between">
        <span className="font-medium">{spec.label}:</span>
        <span>{spec.value}</span>
      </div>
    ))}
  </div>
  )
  */

  const SpecList = ({ specs }: { specs: SpecItem[] }) => (
    <div className='space-y-2'>
      {specs.map((spec, index) => (
        <div key={index} className='flex justify-between'>
          <span className='font-medium'>{spec.label}:</span>
          <span>{spec.value}</span>
        </div>
      ))}
    </div>
  );

  const renderFormFields = () => {
    return (
      <div className='space-y-4'>
        {Object.entries(form.getValues()).map(([key, value]) => (
          <div key={key} className='flex justify-between items-center'>
            <FormField
              control={form.control}
              name={key as keyof VinVehicleData}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-medium'>{spec.label}</FormLabel>
                  {spec.valueType === 'selection' ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={spec.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={spec.value}>{spec.value}</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Input {...field} defaultValue={spec.value} />
                    </FormControl>
                  )}
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderReviewFields = () => {
    return (
      <div className='space-y-4'>
        {vehicleSpecs.map((spec, index) => (
          <div key={index}>
            {spec.label === 'Style' ? (
              <>
                <div className='flex justify-between items-center'>
                  <span className='font-medium'>{spec.label}:</span>
                  <Select
                    onValueChange={handleStyleChange}
                  >
                    <SelectTrigger className='w-[300px]'>
                      <SelectValue placeholder='Select vehicle style' />
                    </SelectTrigger>
                    <SelectContent>
                      {data.years?.[0]?.styles?.map((style, i) => (
                        <SelectItem key={i} value={style.name ?? ''}>
                          {style.name ?? ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <span className='font-medium'>Body Type:</span>
                  <span className='text-gray-400'>{selectedBodyType}</span>
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <span className='font-medium'>Trim:</span>
                  <span className='text-gray-400'>{selectedTrim}</span>
                </div>
              </>
            ) : (
              // if spec.value is null, do not render the field
              spec.value && (
                <div className='flex justify-between items-center'>
                  <span className='font-medium'>{spec.label}:</span>
                  <span className='text-gray-400'>{spec.value || 'N/A'}</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='flex-row items-center gap-3'>
          <div className='rounded-full bg-zinc-800 p-2'>
            <Truck className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1'>
            <DialogTitle className='text-xl font-semibold'>
              {isEditing ? 'Review Vehicle Details' : 'Confirm Vehicle Details'}
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              {isEditing
                ? "We've decoded the following information from the VIN. Please review and confirm before adding the vehicle to TrackTr."
                : 'Please review the information one last time before confirming.'}
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-2'
          >
            <ScrollArea className='h-[calc(100vh-250px)] pr-4'>
              <div className='space-y-4'>
                {isEditing ? renderFormFields() : renderReviewFields()}
              </div>
            </ScrollArea>
          </form>
          <p className='text-sm text-gray-400'>
            {isEditing
              ? 'You can make adjustments if needed, or confirm to proceed.'
              : "Please review the information and confirm if it's correct."}
          </p>

          <div className='flex gap-3 pt-4'>
            {isEditing ? (
              <>
                <Button
                  type='button'
                  variant='outline'
                  className='flex-1 bg-transparent hover:bg-gray-700'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='flex-1 bg-gray-500 hover:bg-gray-600'
                >
                  Review
                </Button>
              </>
            ) : (
              <>
                <Button
                  type='button'
                  variant='outline'
                  className='flex-1 bg-transparent hover:bg-gray-700'
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className='w-4 h-4 mr-2' />
                  Edit
                </Button>
                <Button
                  type='submit'
                  className='flex-1 bg-gray-500 hover:bg-gray-600'
                >
                  <Check className='w-4 h-4 mr-2' />
                  Confirm
                </Button>
              </>
            )}
          </div>
        </Form>
        {/* <DialogFooter className='sticky bottom-0 bg-background pt-2'>
          {isEditing ? (
            <>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type='submit' onClick={form.handleSubmit(onConfirm)}>
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={() => onConfirm(data)}>Confirm</Button>
            </>
          )}
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default VehicleInfoModal;
