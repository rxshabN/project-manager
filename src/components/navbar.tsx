"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

const pathnameMap = {
  tasks: {
    title: "Tasks",
    description: "View all tasks here.",
  },
  projects: {
    title: "Project Overview",
    description: "View all project details here.",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all projects and tasks here.",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathNameKey = pathnameParts[3] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathNameKey] || defaultMap;
  return (
    <nav className="px-6 flex items-center justify-between pt-4">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
