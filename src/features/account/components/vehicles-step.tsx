import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { createAccountSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AccountStepProps } from '../interface';

const VehiclesStep = ({ onLoadingChange, onSubmit }: AccountStepProps) => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      company_name: '',
    },
  });
  return (
    <div>
      Vehicles step
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id='step-4-form'>
          <input type='text' placeholder='First Name' />
          <input type='text' placeholder='Last Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
        </form>
      </Form>
    </div>
  );
};

export default VehiclesStep;
