import Link from "next/link";
import Image from "next/image";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-200 p-4 w-full">
      <Link href="/">
        <div className="flex justify-center gap-1 flex-col">
          <Image src="/icon.svg" alt="image of logo" width={85} height={85} />
          <span className="font-bold text-2xl text-neutral-900">
            Project Manager
          </span>
        </div>
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
