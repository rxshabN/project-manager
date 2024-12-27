import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ProjectIdSettingsClient } from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project",
};

const ProjectIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <ProjectIdSettingsClient />
    </div>
  );
};

export default ProjectIdSettingsPage;
