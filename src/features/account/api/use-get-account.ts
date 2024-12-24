import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetAccount = () => {
  const query = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const response = await client.api.account.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch account');
      }

      const result = await response.json();

      return result;
    },
  });

  return query;
};
