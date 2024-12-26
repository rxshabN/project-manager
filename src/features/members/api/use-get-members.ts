import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }
      const { data } = await response.json();
      return data;
    },
  });
};
