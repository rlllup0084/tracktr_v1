'use client';

import CompanyStep from '@/features/account/components/company-step';
import PreparingAccountOverlay from '@/features/account/components/preparing-account-overlay';
import ProgressSidebar from '@/features/account/components/progress-sidebar';
import Image from 'next/image';
import { useState } from 'react';

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='flex flex-col lg:flex-row max-w-7xl m-auto min-h-[calc(100vh-4rem)] text-white'>
      {/* Step progress pane */}
      <ProgressSidebar />
      {/* Step forms */}
      <div className='flex-grow px-4 py-8 lg:px-8'>
        <div className='mx-auto max-w-2xl'>
          <Image
            className='h-12 w-auto'
            src={'/logo.svg'}
            width={120}
            height={48}
            alt='TrackTr Logo'
          />
          <CompanyStep onLoadingChange={setIsLoading} />
        </div>
      </div>
      {/* Modal Loading Overlay */}
      <PreparingAccountOverlay loading={isLoading} />
    </div>
  );
};

export default AccountPage;
