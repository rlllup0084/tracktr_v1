import { Models } from 'node-appwrite';

export const FleetSizeEnum = {
  LESS_THAN_5: '<5',
  BETWEEN_6_10: '6-10',
  BETWEEN_11_20: '11-20',
  BETWEEN_21_50: '21-50',
  BETWEEN_51_100: '51-100',
  BETWEEN_101_500: '101-500',
  BETWEEN_501_1000: '501-1000',
  MORE_THAN_1000: '>1000',
} as const;

export const IndustryEnum = {
  TECHNOLOGY: 'technology',
  HEALTHCARE: 'healthcare',
  FINANCE: 'finance',
  MANUFACTURING: 'manufactuting',
  RETAIL: 'retail',
  EDUCATION: 'education',
  TRANSPORTATION: 'transportation',
  CONSTRUCTION: 'construction',
  AGRICULTURE: 'agriculture',
  REAL_ESTATE: 'real_estate',
  ENERGY: 'energy',
  TELECOM: 'telecom',
  MEDIA: 'media',
  ENTERTAINMENT: 'entertainment',
  GOVERNMENT: 'government',
  HOSPITALITY: 'hospitality',
  NON_PROFIT: 'non_profit',
  AEROSPACE: 'aerospace',
  AUTOMOTIVE: 'automotive',
  LOGISTICS: 'logistics',
  PHARMACEUTICAL: 'pharmaceutical',
  INSURANCE: 'insurance',
  SPORTS: 'sports',
  OTHER: 'other',
} as const;

export const CompanyRoleEnum = {
  OWNER: 'owner',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  OTHER: 'other',
} as const;

export type Account = Models.Document & {
  company_name: string;
  fleet_size:
    | '<5'
    | '6-10'
    | '11-20'
    | '21-50'
    | '51-100'
    | '101-500'
    | '501-1000'
    | '>1000';
  industry:
    | 'technology'
    | 'healthcare'
    | 'finance'
    | 'manufactuting'
    | 'retail'
    | 'education'
    | 'transportation'
    | 'construction'
    | 'agriculture'
    | 'real_estate'
    | 'energy'
    | 'telecom'
    | 'media'
    | 'entertainment'
    | 'government'
    | 'hospitality'
    | 'non_profit'
    | 'aerospace'
    | 'automotive'
    | 'logistics'
    | 'pharmaceutical'
    | 'insurance'
    | 'sports'
    | 'other';
  company_role: 'owner' | 'manager' | 'employee' | 'other';
  goals: string;
  enable_demo_data: boolean;
  steps_done: number;
  password: string;
  traccar_api: string;
  username: string;
  vin_decoder_key: string;
};
