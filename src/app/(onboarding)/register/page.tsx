import FeaturesCarousel from '@/features/onboarding/components/features-carousel';
import RegisterForm from '@/features/onboarding/components/register-form';

const RegisterPage = () => {
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
