import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getMember } from "../utils";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { Query } from "node-appwrite";
import { Member, memberRole } from "../types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.valid("query");
      const member = await getMember({
        databases,
        workspaceId,
        userid: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const members = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", workspaceId)]
      );
      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userid);
          return {
            ...member,
            name: user.name || user.email,
            email: user.email,
          };
        })
      );
      return c.json({ data: { ...members, documents: populatedMembers } });
    }
  )
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();
    const user = c.get("user");
    const databases = c.get("databases");
    const memberToDelete = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId
    );
    const allMembersInWorkspace = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", memberToDelete.workspaceId)]
    );
    const member = await getMember({
      databases,
      workspaceId: memberToDelete.workspaceId,
      userid: user.$id,
    });
    const workspace = await databases.getDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      memberToDelete.workspaceId
    );
    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (member.$id !== memberToDelete.$id && member.role !== memberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (workspace.userid === memberToDelete.userid) {
      return c.json({ error: "Cannot delete the owner of the workspace" }, 400);
    }
    if (allMembersInWorkspace.total === 1) {
      return c.json(
        { error: "Cannot delete the only member of the workspace" },
        400
      );
    }
    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);
    return c.json({ data: { $id: memberToDelete.$id } });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("json", z.object({ role: z.nativeEnum(memberRole) })),
    async (c) => {
      const { memberId } = c.req.param();
      const { role } = c.req.valid("json");
      const user = c.get("user");
      const databases = c.get("databases");
      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      );
      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToUpdate.workspaceId)]
      );
      const member = await getMember({
        databases,
        workspaceId: memberToUpdate.workspaceId,
        userid: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (member.role !== memberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (memberToUpdate.$id === member.$id && role !== memberRole.ADMIN) {
        return c.json(
          { error: "Cannot downgrade the owner of the workspace" },
          400
        );
      }
      if (memberToUpdate.$id === member.$id && role === memberRole.ADMIN) {
        return c.json({ error: "You are already an administrator" }, 409);
      }
      if (allMembersInWorkspace.total === 1) {
        return c.json(
          { error: "Cannot downgrade the only member of the workspace" },
          400
        );
      }
      await databases.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
        role,
      });
      return c.json({ data: { $id: memberToUpdate.$id } });
    }
  );

export default app;
