import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.account)[':accountId']['vin_decoder']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.account)[':accountId']['vin_decoder']['$patch']
>;

export const useUpdateVinDecoder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.account[':accountId']['vin_decoder'][
        '$patch'
      ]({ json, param });

      if (!response.ok) {
        throw new Error('Failed to update vin decoder');
      }

      return await response.json();
    },
    onSuccess: () => {
      // toast.success('Vin decoder updated');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: () => {
      toast.error('Failed to update vin decoder');
    },
  });

  return mutation;
};
