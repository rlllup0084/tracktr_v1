import AccountStep from "./components/account-step";
import CompanyStep from "./components/company-step";
import { JSX } from 'react';
import IntegrationsStep from "./components/integrations-step";
import VehiclesStep from "./components/vehicles-step";
import ReadyStep from "./components/ready-step";

export interface AccountStep {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (props: any) => JSX.Element;
  status: string;
}

export const accountSteps: AccountStep[] = [
    {
        title: 'Account Setup',
        description:
          'You are registered, verified, and logged in for the first time.',
        component: AccountStep,
        status: 'complete',
      },
      {
        title: 'Company Information',
        description: 'Tell us about your team to tailor your TrackTr experience.',
        component: CompanyStep,
        status: 'current',
      },
      {
        title: 'Integrations',
        description:
          'Connect your fleet to TrackTr for real-time monitoring and data insights.',
        component: IntegrationsStep,
        status: 'pending',
      },
      {
        title: 'Vehicles',
        description: 'Add vehicles to your fleet.',
        component: VehiclesStep,
        status: 'pending',
      },
      {
        title: 'Ready to Go!',
        description: "Congratulations! You're all set to start using TrackTr.",
        component: ReadyStep,
        status: 'pending',
      },
]