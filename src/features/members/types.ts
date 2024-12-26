import { Models } from "node-appwrite";

export enum memberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Models.Document & {
  workspaceId: string;
  userid: string;
  role: memberRole;
};
