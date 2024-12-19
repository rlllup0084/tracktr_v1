import FeaturesCarousel from '@/features/onboarding/components/features-carousel';
import RegisterForm from '@/features/onboarding/components/register-form';

const RegisterPage = () => {
  return (
    <div className='flex min-h-screen text-white'>
      {/* Left split */}
      <div className='flex flex-col justify-center w-full lg:w-1/2 p-6 lg:p-12'>
        <RegisterForm />
      </div>
      {/* Right split */}
      <div className='hidden lg:flex w-1/2 bg-zinc-900 rounded-2xl border border-zinc-800 m-4'>
        <FeaturesCarousel />
      </div>
    </div>
  );
};

export default RegisterPage;
