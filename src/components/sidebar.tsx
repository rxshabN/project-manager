import Link from "next/link";
import Image from "next/image";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";
import { DottedSeparator1 } from "./dotted-separator copy";

export const Sidebar = () => {
  return (
    <aside className="h-full p-4 w-full bg-white text-black">
      <Link href="/">
        <div className="flex items-center gap-x-4">
          <Image
            src="/removebg.png"
            alt="image of logo"
            width={90}
            height={90}
          />
          <span className="font-bold text-2xl text-center">
            Project Manager
          </span>
        </div>
      </Link>
      <DottedSeparator1 className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator1 className="my-4" />
      <Navigation />
      <DottedSeparator1 className="my-4" />
      <Projects />
    </aside>
  );
};
