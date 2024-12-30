import { getCurrent } from '@/features/auth/queries';
import VerifyEmailForm from '@/features/onboarding/components/verify-email-form';
import { redirect } from 'next/navigation';

const VerifyEmailPage = async () => {
  const user = await getCurrent();
  
    if (user && user.emailVerification) {
      redirect('/account');
    }
  
  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center'>
      <VerifyEmailForm user={user} />
    </div>
  );
};

export default VerifyEmailPage;
