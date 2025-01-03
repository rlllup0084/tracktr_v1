import AccountForm from '@/features/account/components/account-form';
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const AccountPage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect('/login');
  } else if (!user.emailVerification) {
    redirect('/verify-email');
  }

  return (
    <div className='flex flex-col lg:flex-row max-w-7xl m-auto min-h-[calc(100vh-4rem)] text-white'>
      <AccountForm />
    </div>
  );
};

export default AccountPage;
