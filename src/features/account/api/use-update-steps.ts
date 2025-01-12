import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.account)[':accountId']['steps']['$patch'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.account)[':accountId']['steps']['$patch']
>;

export const useUpdateSteps = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.account[':accountId']['steps'][
                '$patch'
            ]({ json, param });

            if (!response.ok) {
                throw new Error('Failed to update steps');
            }

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
        onError: () => {
            toast.error('Failed to update steps');
        },
    });

    return mutation;
};