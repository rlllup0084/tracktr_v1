import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.account[":accountId"]["$put"], 200>;
type RequestType = InferRequestType<typeof client.api.account[":accountId"]["$put"]>;

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.account[":accountId"]["$put"]({ json, param });

      if (!response.ok) {
        throw new Error("Failed to update account");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account updated");

      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: () => {
      toast.error("Failed to update account");
    }
  });

  return mutation;
}