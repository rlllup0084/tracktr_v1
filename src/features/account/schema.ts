import { z } from 'zod';

export const createAccountSchema = z.object({
  company_name: z.string().nonempty({ message: 'Company Name is required.' }),
  fleet_size: z.enum(
    ['<5', '6-10', '11-20', '21-50', '51-100', '101-500', '501-1000', '>1000'],
    {
      message: 'Fleet Size is required.',
    }
  ),
  industry: z.enum(
    [
      'technology',
      'healthcare',
      'finance',
      'manufactuting',
      'retail',
      'education',
      'transportation',
      'construction',
      'agriculture',
      'real_estate',
      'energy',
      'telecom',
      'media',
      'entertainment',
      'government',
      'hospitality',
      'non_profit',
      'aerospace',
      'automotive',
      'logistics',
      'pharmaceutical',
      'insurance',
      'sports',
      'other',
    ],
    {
      message: 'Industry is required.',
    }
  ),
  company_role: z.enum(['owner', 'manager', 'employee', 'other'], {
    message: 'Company Role is required.',
  }),
  // add a new field to the schema for "What do you want to achieve with TrackTr?"
  goals: z.string().length(500, {message: 'Goals must be less than 500 characters.'}),
  enable_demo_data: z.boolean(),
  steps_done: z.number().int().min(0, { message: 'Steps Done must be a non-negative integer.' }),
});

export const updateExpiryAndLimitSchema = z.object({
  trial_expiry_date: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: 'Trial Expiry Date is required.',
    })
  ),
  asset_limit: z
    .number()
    .int()
    .min(1, { message: 'Asset Limit must be at least 1.' }),
});

export const updateTraccarIntegrationSchema = z.object({
  traccar_api_url: z
    .string()
    .url({ message: 'Traccar API URL must be a valid URL.' }),
  username: z.string().nonempty({ message: 'Username is required.' }),
  password: z.string().nonempty({ message: 'Password is required.' }),
});

export const updateVinDecoderSchema = z.object({
  vin_decoder_key: z
    .string()
    .nonempty({ message: 'VIN Decoder key is required.' }),
});
