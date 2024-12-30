import LoginForm from '@/features/auth/components/login-form';
import { getCurrent } from '@/features/auth/queries';
import FeaturesCarousel from '@/features/onboarding/components/features-carousel';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const user = await getCurrent();

  if (user && !user.emailVerification) {
    redirect('/verify-email');
  }
  
  return (
    <div className='flex max-w-7xl m-auto min-h-[calc(100vh-4rem)] text-white'>
      {/* Left split */}
      <div className='flex flex-col justify-center w-full lg:w-1/2 p-6 lg:p-12'>
        <LoginForm />
      </div>
      {/* Right split */}
      <div className='hidden lg:flex w-1/2 bg-zinc-900 rounded-2xl border border-zinc-800 mx-4 my-12'>
        <FeaturesCarousel />
      </div>
    </div>
  );
};

export default LoginPage;
