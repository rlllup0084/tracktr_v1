import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.auth.verify_otp)['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.auth.verify_otp)['$post']
>;

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.verify_otp['$post']({ json });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('OTP verified');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] });
    },
    onError: () => {
      toast.error('Failed to verify OTP');
    },
  });

  return mutation;
};
