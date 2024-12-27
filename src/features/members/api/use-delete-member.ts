import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });
      if (response.status === 400) {
        throw new Error("Cannot delete the owner of the workspace");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      if (response.status === 409) {
        throw new Error("Cannot delete the only member of the workspace");
      }
      return (await response.json()) as ResponseType;
    },
    onSuccess: async () => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete member");
    },
  });
  return mutation;
};
