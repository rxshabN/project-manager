import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      });
      if (response.status === 400) {
        throw new Error("Cannot downgrade the owner of the workspace");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      if (response.status === 409) {
        throw new Error("You are already an administrator");
      }
      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      toast.success("Member updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update member");
    },
  });
  return mutation;
};
