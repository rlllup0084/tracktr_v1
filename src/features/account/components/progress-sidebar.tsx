import { AccountStep, accountSteps } from '@/features/account/accountSteps';
import {
  CheckCircle2,
  Circle,
  Github,
  Linkedin,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

interface ProgressSidebarProps {
  currentStep: number
}

const ProgressSidebar = ({ currentStep }: ProgressSidebarProps) => {
  return (
    <div className='w-full lg:w-80 flex-shrink-0 bg-zinc-900/50 p-6 flex flex-col items-center lg:items-start'>
      <div className='space-y-6 w-full text-center lg:text-left'>
        <h2 className='text-xl font-semibold text-white'>
          Initialization progress
        </h2>
        <p className='text-sm text-gray-400'>
          Complete the steps to set up your account, configure vehicles, and
          integrate with key systems.
        </p>

        <ul className='flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-0 lg:space-y-4 relative pb-4 lg:pb-0 before:hidden lg:before:block before:absolute before:left-1/2 lg:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-gray-700 justify-center lg:justify-start items-center lg:items-start'>
          {accountSteps.map((step: AccountStep, index, array) => (
            <li
              key={index}
              className='relative flex flex-col lg:flex-row items-center lg:items-start pb-0 lg:pb-8 last:pb-0 flex-shrink-0 lg:flex-shrink w-24 h-16 lg:w-full'
            >
              <div className='flex h-6 w-6 shrink-0 items-center justify-center relative z-10 bg-gray-900'>
                {index < currentStep ? (
                  <CheckCircle2 className='h-6 w-6 text-green-500' />
                ) : index === currentStep ? (
                  <div className='h-4 w-4 rounded-full bg-white' />
                ) : (
                  <Circle className='h-6 w-6 text-gray-400' />
                )}
              </div>
              <div className='mt-2 lg:mt-0 lg:ml-4 text-center lg:text-left'>
                <p
                  className={`text-xs lg:text-sm font-medium ${
                    index > currentStep ? 'text-gray-400' : 'text-white'
                  }`}
                >
                  {step.title}
                </p>
                <p className='hidden lg:block text-xs text-gray-400'>
                  {step.description}
                </p>
              </div>
              {index < array.length - 1 && (
                <div className='absolute top-3 left-[calc(50%+12px)] w-[calc(100%-24px)] h-px bg-gray-700 lg:hidden'></div>
              )}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-400 mt-4">
            Note: Steps marked with <X className="inline h-4 w-4 text-yellow-500" /> have been skipped. You can always come back to complete them later.
          </p>

        <div className='mt-6 flex justify-center lg:justify-start space-x-4 w-full'>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Twitter className='h-5 w-5' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Linkedin className='h-5 w-5' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Youtube className='h-5 w-5' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Github className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;
