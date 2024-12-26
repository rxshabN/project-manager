import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "../members/utils";
import { Project } from "./types";

interface GetProjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectProps) => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userid: user.$id,
      workspaceId: project.workspaceId,
    });
    if (!member) {
      return null;
    }

    return project;
  } catch {
    return null;
  }
};
