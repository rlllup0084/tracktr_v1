export interface AccountStep {
  title: string;
  description: string;
  component: string;
  status: string;
}

export const accountSteps: AccountStep[] = [
    {
        title: 'Account Setup',
        description:
          'You are registered, verified, and logged in for the first time.',
        component: '',
        status: 'complete',
      },
      {
        title: 'Company Information',
        description: 'Tell us about your team to tailor your TrackTr experience.',
        component: '',
        status: 'current',
      },
      {
        title: 'Integrations',
        description:
          'Connect your fleet to TrackTr for real-time monitoring and data insights.',
        component: '',
        status: 'pending',
      },
      {
        title: 'Vehicles',
        description: 'Add vehicles to your fleet.',
        component: '',
        status: 'pending',
      },
      {
        title: 'Ready to Go!',
        description: "Congratulations! You're all set to start using TrackTr.",
        component: '',
        status: 'pending',
      },
]