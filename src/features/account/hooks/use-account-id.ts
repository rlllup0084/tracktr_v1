import { useParams } from 'next/navigation';

export const useAccountId = () => {
  const params = useParams();
  return params.accountId as string;
};
