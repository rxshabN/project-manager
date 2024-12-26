import { Query, type Databases } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/config";

interface getMemberProps {
  databases: Databases;
  workspaceId: string;
  userid: string;
}

export const getMember = async ({
  databases,
  workspaceId,
  userid,
}: getMemberProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userid", userid),
  ]);
  return members.documents[0];
};
