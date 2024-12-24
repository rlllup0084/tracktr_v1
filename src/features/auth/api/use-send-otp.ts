import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.send_otp["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.send_otp["$post"]>;

export const useSendOtp = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.send_otp["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("OTP sent to your email");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to send OTP");
    }
  });

  return mutation;
};