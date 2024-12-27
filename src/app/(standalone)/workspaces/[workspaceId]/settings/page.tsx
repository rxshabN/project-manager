import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdSettingsClient } from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Workspace",
};

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <WorkspaceIdSettingsClient />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
