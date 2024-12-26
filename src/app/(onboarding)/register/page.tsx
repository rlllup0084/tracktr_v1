import { getCurrent } from '@/features/auth/queries';
import FeaturesCarousel from '@/features/onboarding/components/features-carousel';
import RegisterForm from '@/features/onboarding/components/register-form';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
  const user = await getCurrent();

  // If user is not null and user.emailVerification is false, then redirect to verify email page
  if (user && !user.emailVerification) {
    redirect('/verify-email');
  }

  return (
    <div className='flex max-w-7xl m-auto min-h-screen text-white'>
      {/* Left split */}
      <div className='flex flex-col justify-center w-full lg:w-1/2 p-6 lg:p-12'>
        <RegisterForm />
      </div>
      {/* Right split */}
      <div className='hidden lg:flex w-1/2 bg-zinc-900 rounded-2xl border border-zinc-800 mx-4 my-12'>
        <FeaturesCarousel />
      </div>
    </div>
  );
};

export default RegisterPage;
