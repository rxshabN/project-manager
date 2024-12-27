import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Workspace",
};

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <WorkspaceIdJoinClient />
    </div>
  );
};

export default WorkspaceIdJoinPage;
