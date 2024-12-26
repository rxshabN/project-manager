import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspace = ({ workspaceId }: useGetWorkspaceProps) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch workspace");
      }
      const { data } = await response.json();
      return data;
    },
  });
};
