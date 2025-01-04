import { useParams } from "next/navigation";

export const useProjectId = () => {
  const params = useParams();
  if (!params.projectId) {
    return "";
  } else {
    return params.projectId as string;
  }
};
