import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createAccountSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { AccountStepProps } from '../interface';
import { useEffect } from 'react';

const CompanyStep = ({ onSubmit, data }: AccountStepProps) => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      company_name: '',
      fleet_size: '51-100',
      industry: 'logistics',
      company_role: 'owner',
      goals: '',
      enable_demo_data: false,
      steps_done: 1,
    },
  });

  // ...initialValues,
  //     image: initialValues.imageUrl ?? "",

  useEffect(() => {
    console.log('Initial Data', data);
  }, [data])

  // Populate the form with the initial data
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      <Card className='mt-8 bg-transparent border-none'>
        <Form {...form}>
          <form
            className='space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}
            id='step-2-form'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='company_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      Company or Organization Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Company name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fleet_size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      How many assets do you have in your fleet?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='grid grid-cols-2 md:grid-cols-4 gap-3'
                      >
                        {Object.values(
                          createAccountSchema.shape.fleet_size._def.values
                        ).map((size) => (
                          <FormItem key={size}>
                            <FormControl>
                              <RadioGroupItem
                                value={size}
                                className='peer sr-only'
                                id={`fleet-size-${size}`}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`fleet-size-${size}`}
                              className='flex flex-col items-center justify-between rounded-md border-2 border-input bg-transparent p-4 hover:bg-none hover:border-zinc-600 hover:text-accent-foreground peer-data-[state=checked]:border-zinc-600 [&:has([data-state=checked])]:border-zinc-600'
                            >
                              {size}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='industry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      What is your company&apos;s primary industry?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select industry' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(
                          createAccountSchema.shape.industry._def.values
                        ).map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry
                              .split('_')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='company_role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      What is your role in the company?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(
                          createAccountSchema.shape.company_role._def.values
                        ).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role
                              .split('_')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='goals'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      What do you want to achieve with TrackTr?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className='min-h-[120px]'
                        placeholder='Enter your goals (max 500 characters)'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='text-gray-400'>
                      {field.value.length}/500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='enable_demo_data'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 pt-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='text-white'>
                        Enable Demo Data
                      </FormLabel>
                      <FormDescription className='text-sm text-gray-400'>
                        Install demo data to explore TrackTr? You can remove it
                        later in the settings when ready for live use.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-4'>
              <p className='text-sm text-gray-400'>
                By sharing a few details, we can tailor the platform to suit
                your company&apos;s needs and help you get the most out of
                TrackTr.
              </p>
              {/* <Button
                type='submit'
                className='w-full bg-gray-600 hover:bg-gray-500'
              >
                Continue
              </Button> */}
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default CompanyStep;
