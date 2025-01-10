import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.account)['$post']>;
type RequestType = InferRequestType<(typeof client.api.account)['$post']>;

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.account['$post']({ json });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      return await response.json();
    },
    onSuccess: () => {
      // toast.success('Account created');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: () => {
      toast.error('Failed to create account');
    },
  });

  return mutation;
};
