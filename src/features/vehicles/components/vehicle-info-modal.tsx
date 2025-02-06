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
  type VinVehicleData,
  vinVehicleDataSchema,
} from '../utils/parseVehicleData';
import { Check, Edit2, Truck } from 'lucide-react';
import type { SpecItem } from '../interfaces';
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
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@/components/custom-tabs';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VehicleInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: VinVehicleData;
  onConfirm: (data: VinVehicleData) => void;
}

const VehicleInfoModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
}: VehicleInfoModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
  const [vehicleSpecs, setVehicleSpecs] = useState<SpecItem[]>([
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
    {
      label: 'Number of Doors',
      value: `${data.numOfDoors ?? ''}`,
      valueType: 'input',
    }, // 4
    {
      label: 'Style',
      value: data.styleId
        ? data.years?.[0]?.styles?.find((style) => style.name === data.styleId)
            ?.name
        : data.years?.[0]?.styles?.[0]?.name ?? '',
      valueType: 'selection',
      // XFE
    },
    {
      label: 'Body Type',
      value: data.styleId
        ? data.years?.[0]?.styles?.find((style) => style.name === data.styleId)
            ?.submodel?.body
        : data.years?.[0]?.styles?.[0]?.submodel?.body ?? '',
      valueType: 'input',
    }, // Crew Cab Pickup
    {
      label: 'Trim',
      value: data.styleId
        ? data.years?.[0]?.styles?.find((style) => style.name === data.styleId)
            ?.trim
        : data.years?.[0]?.styles?.[0]?.trim ?? '',
      valueType: 'input',
    },
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
      label: 'Primary Body Type',
      value: `${data.categories?.primaryBodyType ?? ''}`,
      valueType: 'input',
    }, // Truck
    {
      label: 'Market Class',
      value: `${data.categories?.market ?? ''}`,
      valueType: 'input',
    }, // Flex Fuel
    {
      label: 'Vehicle Size',
      value: `${data.categories?.vehicleSize ?? ''}`,
      valueType: 'input',
    }, // Large
    {
      label: 'EPA Class',
      value: `${data.categories?.epaClass ?? ''}`,
      valueType: 'input',
    }, // Standard Pickup Trucks
    {
      label: 'Fuel Capacity',
      valueType: 'input',
    }, // eg. 20 gal or 20 L
    {
      label: 'MPG (City)',
      value: `${data.mpg?.city ?? ''}`,
      valueType: 'input',
    }, // 15
    {
      label: 'MPG (Highway)',
      value: `${data.mpg?.highway ?? ''}`,
      valueType: 'input',
    }, // 21
    // --------------------------------------------------------
    {
      label: 'Engine Name',
      value: `${data.engine?.name ?? ''} ${data.engine?.configuration ?? ''}${
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
      label: 'Displacement',
      value: `${data.engine?.displacement ?? ''}`,
      valueType: 'input',
    }, // 5.3L (5328 cc)
    {
      label: 'Horsepower',
      value: `${data.engine?.horsepower ?? ''}`,
      valueType: 'input',
    }, // 315 hp @ 5200 rpm
    {
      label: 'RPM (Horsepower)',
      value: `${data.engine?.rpm?.horsepower ?? ''}`,
      valueType: 'input',
    }, // 5200
    {
      label: 'Torque',
      value: `${data.engine?.torque ?? ''}`,
      valueType: 'input',
    }, // 338 lb-ft @ 4400 rpm
    {
      label: 'RPM (Torque)',
      value: `${data.engine?.rpm?.torque ?? ''}`,
      valueType: 'input',
    }, // 5200
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
      label: 'Cylinders',
      value: `${data.engine?.cylinder ?? ''}`,
      valueType: 'input',
    }, // 8
    {
      label: 'Total Valves',
      value: `${data.engine?.totalValves ?? ''}`,
      valueType: 'input',
    }, // 16
    {
      label: 'Engine Configuration',
      value: `${data.engine?.configuration ?? ''}`,
      valueType: 'input',
    }, // V8
    {
      label: 'Compressor Type',
      value: `${data.engine?.compressorType ?? ''}`,
      valueType: 'input',
    }, // Compressor Type
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
      label: 'Engine Code',
      value: `${data.engine?.code ?? ''}`,
      valueType: 'input',
    }, // 8VNAF5.3
    { label: 'Manufacturer Engine Code', valueType: 'input' }, // Engine Manufacturer
    // { label: 'Fuel Capacity', valueType: 'input' }, // Fuel Capacity redudant
    {
      label: 'Transmission Name',
      value: `${data.transmission?.name ?? ''}`,
      valueType: 'input',
    }, // Transmission Name
    {
      label: 'Number of Speeds',
      value: `${data.transmission?.numberOfSpeeds ?? ''}`,
      valueType: 'input',
    }, // 6
    {
      label: 'Transmission Type',
      value: `${data.transmission?.transmissionType ?? ''}`,
      valueType: 'input',
    }, // Automatic
    {
      label: 'Drivetrain',
      value: `${data.drivenWheels ?? ''}`,
      valueType: 'input',
    }, // Rear-wheel drive (RWD)
  ]);

  const form = useForm<VinVehicleData>({
    resolver: zodResolver(vinVehicleDataSchema),
    defaultValues: data,
  });

  const updateSpecValue = (
    specLabel: string,
    newValue: string | undefined
  ) => {
    if (!newValue) return;
    const spec = vehicleSpecs.find((s) => s.label === specLabel);
    if (spec && spec.value !== newValue) {
      spec.value = newValue;
    }
  };

  const handleSubmit = (data: VinVehicleData) => {
    if (isEditing) {
      console.log('Edited data:', data);
      // iterate vehicleSpecs values and compare with data
      // if different, set the new value
      // if same, keep the old value
      vehicleSpecs.forEach(() => {
        // iterate through the data object and update the spec value if it's different
        updateSpecValue('Vehicle Name', data.vehicleName); // vehicleName
        updateSpecValue('VIN', data.vin); // vin
        updateSpecValue('Make', data.make?.name); // maker
        updateSpecValue('Model', data.model?.name); // vehicleModel
        updateSpecValue('Year', data.year?.toString()); // year
        updateSpecValue('Number of Doors', data.numOfDoors); // numOfDoors
        updateSpecValue('Style', data.styleId); // styleId
        updateSpecValue('Body Type', data.bodyType); // bodyType
        updateSpecValue('Trim', data.trim); // trim
        updateSpecValue('Vehicle Type', data.categories?.vehicleType); // vehicleType
        updateSpecValue('Vehicle Style', data.categories?.vehicleStyle); // vehicleStyle
        updateSpecValue('Primary Body Type', data.categories?.primaryBodyType); // primaryBodyType
        updateSpecValue('Market Class', data.categories?.market); // market
        updateSpecValue('Vehicle Size', data.categories?.vehicleSize); // vehicleSize
        updateSpecValue('EPA Class', data.categories?.epaClass); // epaClass
        updateSpecValue('Fuel Capacity', data.fuelCapacity?.toString()); // fuelCapacity
        updateSpecValue('MPG (City)', data.mpg?.city?.toString()); // mpgCity
        updateSpecValue('MPG (Highway)', data.mpg?.highway?.toString()); // mpgHighway

        // Engine specs
        updateSpecValue('Engine Name', data.engineName); // engineName
        updateSpecValue('Engine Type', data.engine?.type); // engineType
        updateSpecValue('Displacement', data.engine?.displacement?.toString()); // engineDisplacement
        updateSpecValue('Horsepower', data.engine?.horsepower?.toString()); // engineHorsepower
        updateSpecValue(
          'RPM (Horsepower)',
          data.engine?.rpm?.horsepower?.toString()
        ); // rpmHorserpower
        updateSpecValue('Torque', data.engine?.torque?.toString()); // engineTorque
        updateSpecValue('RPM (Torque)', data.engine?.rpm?.torque?.toString()); // rpmTorque
        updateSpecValue('Fuel Type', data.engine?.fuelType); // fuelType
        updateSpecValue(
          'Compression Ratio',
          data.engine?.compressionRatio?.toString()
        ); // compressionRatio
        updateSpecValue('Cylinders', data.engine?.cylinder?.toString()); // Cylinder
        updateSpecValue('Total Valves', data.engine?.totalValves?.toString()); // totalValves
        updateSpecValue('Engine Configuration', data.engine?.configuration); // engineConfiguration
        updateSpecValue('Compressor Type', data.engine?.compressorType); // compressorType
        updateSpecValue('Valve Timing', data.engine?.valve?.timing); // valveTiming
        updateSpecValue('Valve Gear', data.engine?.valve?.gear); // valveGear
        updateSpecValue('Engine Code', data.engine?.code); // engineCode
        updateSpecValue(
          'Manufacturer Engine Code',
          data.engine?.manufacturerEngineCode
        ); // engineManufacturerCode

        // Transmission specs
        updateSpecValue('Transmission Name', data.transmission?.name); // transmissionName
        updateSpecValue(
          'Number of Speeds',
          data.transmission?.numberOfSpeeds?.toString()
        ); // numberOfSpeeds
        updateSpecValue(
          'Transmission Type',
          data.transmission?.transmissionType
        ); // transmissionType
        updateSpecValue('Drivetrain', data.drivenWheels); // drivenWheels
      });
      //  refresh renderReviewSection
      setVehicleSpecs([...vehicleSpecs]);
      setIsEditing(false);
    } else {
      // TODO: make sure that data confirmed all the fields above
      // Update data with latest values from vehicleSpecs
      vehicleSpecs.forEach((spec) => {
        switch (spec.label) {
          case 'Vehicle Name':
            data.vehicleName = spec.value;
            break;
          case 'VIN':
            data.vin = spec.value;
            break;
          case 'Make':
            if (data.make) {
              data.make.name = spec.value;
              data.maker = spec.value;
            }
            break;
          case 'Model':
            if (data.model) {
              data.model.name = spec.value;
              data.vehicleModel = spec.value;
            }
            break;
          case 'Year':
            data.year = parseInt(spec.value || '0');
            break;
          case 'Number of Doors':
            data.numOfDoors = spec.value;
            break;
          case 'Style':
            data.styleId = spec.value;
            break;
          case 'Body Type':
            data.bodyType = spec.value;
            break;
          case 'Trim':
            data.trim = spec.value;
            break;
          case 'Vehicle Type':
            if (data.categories) {
              data.categories.vehicleType = spec.value;
              data.vehicleType = spec.value;
            }
            break;
          case 'Vehicle Style':
            if (data.categories) {
              data.categories.vehicleStyle = spec.value;
              data.vehicleStyle = spec.value;
            }
            break;
          case 'Primary Body Type':
            if (data.categories) {
              data.categories.primaryBodyType = spec.value;
              data.primaryBodyType = spec.value;
            }
            break;
          case 'Market Class':
            if (data.categories) {
              data.categories.market = spec.value;
              data.market = spec.value;
            }
            break;
          case 'Vehicle Size':
            if (data.categories) {
              data.categories.vehicleSize = spec.value;
              data.vehicleSize = spec.value;
            }
            break;
          case 'EPA Class':
            if (data.categories) {
              data.categories.epaClass = spec.value;
              data.epaClass = spec.value;
            }
            break;
          case 'Fuel Capacity':
            data.fuelCapacity = parseFloat(spec.value || '0');
            break;
          case 'MPG (City)':
            if (data.mpg) {
              data.mpg.city = spec.value || '0';
              data.mpgCity = spec.value || '0';
            }
            break;
          case 'MPG (Highway)':
            if (data.mpg) {
              data.mpg.highway = spec.value || '0';
              data.mpgHighway = spec.value || '0';
            }
            break;
          case 'Engine Name':
            data.engineName = spec.value;
            break;
          case 'Engine Type':
            if (data.engine) {
              data.engine.type = spec.value;
              data.engineType = spec.value;
            }
            break;
          case 'Displacement':
            if (data.engine) {
              data.engine.displacement = parseFloat(spec.value || '0');
              data.engineDisplacement = parseFloat(spec.value || '0');
            }
            break;
          case 'Horsepower':
            if (data.engine) {
              data.engine.horsepower = parseInt(spec.value || '0');
              data.engineHorsepower = parseInt(spec.value || '0');
            }
            break;
          case 'RPM (Horsepower)':
            if (data.engine?.rpm) {
              data.engine.rpm.horsepower = parseInt(spec.value || '0');
              data.rpmHorserpower = parseInt(spec.value || '0');
            }
            break;
          case 'Torque':
            if (data.engine) {
              data.engine.torque = parseInt(spec.value || '0');
              data.engineTorque = parseInt(spec.value || '0');
            }
            break;
          case 'RPM (Torque)':
            if (data.engine?.rpm) {
              data.engine.rpm.torque = parseInt(spec.value || '0');
              data.rpmTorque = parseInt(spec.value || '0');
            }
            break;
          case 'Fuel Type':
            if (data.engine) {
              data.engine.fuelType = spec.value;
              data.fuelType = spec.value;
            }
            break;
          case 'Compression Ratio':
            if (data.engine) {
              data.engine.compressionRatio = parseFloat(spec.value || '0');
              data.compressionRatio = parseFloat(spec.value || '0');
            }
            break;
          case 'Cylinders':
            if (data.engine) {
              data.engine.cylinder = parseInt(spec.value || '0');
              data.Cylinder = parseInt(spec.value || '0');
            }
            break;
          case 'Total Valves':
            if (data.engine) {
              data.engine.totalValves = parseInt(spec.value || '0');
              data.totalValves = parseInt(spec.value || '0');
            }
            break;
          case 'Engine Configuration':
            if (data.engine) {
              data.engine.configuration = spec.value;
              data.engineConfiguration = spec.value;
            }
            break;
          case 'Compressor Type':
            if (data.engine) {
              data.engine.compressorType = spec.value;
              data.compressorType = spec.value;
            }
            break;
          case 'Valve Timing':
            if (data.engine?.valve) {
              data.engine.valve.timing = spec.value;
              data.valveTiming = spec.value;
            }
            break;
          case 'Valve Gear':
            if (data.engine?.valve) {
              data.engine.valve.gear = spec.value;
              data.valveGear = spec.value;
            }
            break;
          case 'Engine Code':
            if (data.engine) {
              data.engine.code = spec.value;
              data.engineCode = spec.value;
            }
            break;
          case 'Manufacturer Engine Code':
            if (data.engine) {
              data.engine.manufacturerEngineCode = spec.value;
              data.engineManufacturerCode = spec.value;
            }
            break;
          case 'Transmission Name':
            if (data.transmission) {
              data.transmission.name = spec.value;
              data.transmissionName = spec.value;
            }
            break;
          case 'Number of Speeds':
            if (data.transmission) {
              data.transmission.numberOfSpeeds = spec.value || '0';
              data.numberOfSpeeds = spec.value || '0';
            }
            break;
          case 'Transmission Type':
            if (data.transmission) {
              data.transmission.transmissionType = spec.value;
              data.transmissionType = spec.value;
            }
            break;
          case 'Drivetrain':
            data.drivenWheels = spec.value;
            break;
        }
      });
      onConfirm(data);
    }
  };

  // Make sure everytime model is shown, the isEditing state is reset to false
  useEffect(() => {
    setIsEditing(false);
  }, [isOpen]);

  useEffect(() => {
    setSelectedStyle(data.years?.[0]?.styles?.[0]?.name ?? '');
    setSelectedBodyType(data.years?.[0]?.styles?.[0]?.submodel?.body ?? 'N/A');
    setSelectedTrim(data.years?.[0]?.styles?.[0]?.trim ?? 'N/A');
  }, [data]);

  const [selectedStyle, setSelectedStyle] = useState(
    data.years?.[0]?.styles?.[0]?.name ?? ''
  );
  const [selectedBodyType, setSelectedBodyType] = useState(
    data.years?.[0]?.styles?.[0]?.submodel?.body ?? 'N/A'
  );
  const [selectedTrim, setSelectedTrim] = useState(
    data.years?.[0]?.styles?.[0]?.trim ?? 'N/A'
  );

  const handleStyleChange = (styleName: string) => {
    setSelectedStyle(styleName);
    const selectedStyleData = data.years?.[0]?.styles?.find(
      (style) => style.name === styleName
    );
    if (selectedStyleData?.submodel?.body) {
      setSelectedBodyType(selectedStyleData.submodel.body);
    }
    if (selectedStyleData?.trim) {
      setSelectedTrim(selectedStyleData.trim);
    }
  };

  const renderFormFields = () => {
    return (
      <div className='space-y-4'>
        <TabsRoot
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-3 mb-4 bg-zinc-800'>
            <TabsTrigger value='general'>General</TabsTrigger>
            <TabsTrigger value='engine'>Engine</TabsTrigger>
            <TabsTrigger value='transmission'>Transmission</TabsTrigger>
          </TabsList>
          <TabsContent value='general'>{renderGeneralFields()}</TabsContent>
          <TabsContent value='engine'>{renderEngineFields()}</TabsContent>
          <TabsContent value='transmission'>
            {renderTransmissionFields()}
          </TabsContent>
        </TabsRoot>
      </div>
    );
  };

  const renderGeneralFields = () => (
    <div className='space-y-4 pb-2 px-1'>
      <FormField
        control={form.control}
        name='vehicleName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value ||
                  `${data.years?.[0]?.year ?? ''} ${data.make?.name ?? ''} ${
                    data.model?.name ?? ''
                  }`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='vin'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>VIN</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='make.name'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Make</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.make?.name ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='model.name'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Model</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.model?.name ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='year'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Year</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.years?.[0]?.year ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='numOfDoors'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Number of Doors</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='styleId'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Style</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleStyleChange(value);
              }}
              value={selectedStyle}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select vehicle style' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.years?.[0]?.styles?.map((style, i) => (
                  <SelectItem key={i} value={style.name ?? ''}>
                    {style.name ?? ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='bodyType'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Body Type</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || selectedBodyType} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='trim'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Trim</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || selectedTrim} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.vehicleType'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Vehicle Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.categories?.vehicleType ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.vehicleStyle'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Vehicle Style</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.categories?.vehicleStyle ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.primaryBodyType'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Primary Body Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value || `${data.categories?.primaryBodyType ?? ''}`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.market'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Market Class</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.categories?.market ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.vehicleSize'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Vehicle Size</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.categories?.vehicleSize ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categories.epaClass'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>EPA Class</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.categories?.epaClass ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='fuelCapacity'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>EPA Class</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.fuelCapacity ?? 'N/A'}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='mpg.city'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>MPG (City)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.mpg?.city ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='mpg.highway'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>MPG (Highway)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.mpg?.highway ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  const renderEngineFields = () => (
    <div className='space-y-4 pb-2 px-1'>
      <FormField
        control={form.control}
        name='engineName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Engine Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value ||
                  `${data.engine?.name ?? ''} ${
                    data.engine?.configuration ?? ''
                  }${data.engine?.cylinder ?? ''}`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.type'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Engine Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.type ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.displacement'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Displacement</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.displacement ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.horsepower'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Horsepower</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.horsepower ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.rpm.horsepower'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>RPM (Horsepower)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.rpm?.horsepower ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.torque'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Torque</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.torque ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.rpm.torque'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>RPM (Torque)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.rpm?.torque ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.fuelType'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Fuel Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.fuelType ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.compressionRatio'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Compression Ratio</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.compressionRatio ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.cylinder'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Cylinders</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.cylinder ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.totalValves'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Total Valves</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.totalValves ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.configuration'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Engine Configuration</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.configuration ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.compressorType'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Compressor Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.compressorType ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.valve.timing'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Valve Timing</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.valve?.timing ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.valve.gear'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Valve Gear</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.valve?.gear ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.code'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Engine Code</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.engine?.code ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='engine.manufacturerEngineCode'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>
              Manufacturer Engine Code
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value ||
                  `${data.engine?.manufacturerEngineCode ?? 'N/A'}`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  const renderTransmissionFields = () => (
    <div className='space-y-4 pb-2 px-1'>
      <FormField
        control={form.control}
        name='transmission.name'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Transmission Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.transmission?.name ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='transmission.numberOfSpeeds'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Number of Speeds</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value || `${data.transmission?.numberOfSpeeds ?? ''}`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='transmission.transmissionType'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Transmission Type</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={
                  field.value || `${data.transmission?.transmissionType ?? ''}`
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='drivenWheels'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel className='text-white'>Drivetrain</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || `${data.drivenWheels ?? ''}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  const renderReviewFields = () => {
    return (
      <div className='space-y-4'>
        <TabsRoot defaultValue='general' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-4 bg-zinc-800'>
            <TabsTrigger value='general'>General</TabsTrigger>
            <TabsTrigger value='engine'>Engine</TabsTrigger>
            <TabsTrigger value='transmission'>Transmission</TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            {renderReviewSection(vehicleSpecs.slice(0, 18))}
          </TabsContent>
          <TabsContent value='engine'>
            {renderReviewSection(vehicleSpecs.slice(18, 35))}
          </TabsContent>
          <TabsContent value='transmission'>
            {renderReviewSection(vehicleSpecs.slice(35))}
          </TabsContent>
        </TabsRoot>
      </div>
    );
  };

  const renderReviewSection = (specs: SpecItem[]) => (
    <div className='space-y-2 px-1'>
      {specs.map((spec, index) => (
        <div
          key={index}
          className={`flex justify-between items-center py-1 ${
            index !== specs.length - 1 ? 'border-b border-zinc-800' : ''
          }`}
        >
          <span className='text-sm font-medium'>{spec.label}:</span>
          <span className='text-sm text-gray-400'>{spec.value || 'N/A'}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] h-[90vh] flex flex-col overflow-hidden'>
        <DialogHeader className='flex-row items-center gap-3'>
          <div className='rounded-full bg-zinc-800 p-2'>
            <Truck className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1'>
            <DialogTitle className='text-xl font-semibold'>
              {isEditing ? 'Edit Vehicle Details' : 'Confirm Vehicle Details'}
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              {isEditing
                ? 'Make changes to the vehicle information below.'
                : 'Please review the information before confirming.'}
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex-1 flex overflow-hidden flex-col'
          >
            <ScrollArea className='flex-1 [&>div>div]:!block pr-2' type='hover'>
              {isEditing ? renderFormFields() : renderReviewFields()}
            </ScrollArea>
            <div className='flex gap-3 pt-4 mt-4 mb-1 border-t border-zinc-800'>
              {isEditing ? (
                <>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1 bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white transition duration-200'
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white transition duration-200'
                  >
                    <Check className='w-4 h-4 mr-2' />
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1 bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white transition duration-200'
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className='w-4 h-4 mr-2' />
                    Edit
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1 bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white transition duration-200'
                  >
                    <Check className='w-4 h-4 mr-2' />
                    Confirm
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleInfoModal;
