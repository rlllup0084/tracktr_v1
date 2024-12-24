import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.account[":accountId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.account[":accountId"]["$patch"]>;

export const useUpdateExpiryLimit = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.account[":accountId"]["$patch"]({ json, param });

      if (!response.ok) {
        throw new Error("Failed to update trial expiry and asset limit");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Trial expiry and asset limit updated");

      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: () => {
      toast.error("Failed to update trial expiry and asset limit");
    }
  });

  return mutation;
};