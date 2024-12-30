import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)['$post']
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register['$post']({ json });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log(
          'Failed to register:',
          response.status,
          response.statusText,
          errorDetails
        );
        toast.error(`Failed to register`, { description: errorDetails.message });
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('User successfully registered');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
    },
  });

  return mutation;
};
