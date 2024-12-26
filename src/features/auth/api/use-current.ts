import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useCurrent = () => {
  return useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();
      if (!response.ok) {
        return null;
      }
      const { data } = await response.json();
      return data;
    },
  });
};
