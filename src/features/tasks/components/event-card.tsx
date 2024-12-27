import { Project } from "@/features/projects/types";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import { MembersAvatar } from "@/features/members/components/members-avatar";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Member } from "@/features/members/types";

interface EventCardProps {
  title: string;
  assignee: Member;
  project: Project;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "border-l-black",
  [TaskStatus.BACKLOG]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  return (
    <div className="px-2 overflow-hidden">
      <div
        onClick={onClick}
        className={cn(
          "overflow-hidden p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:bg-slate-400/70 transition",
          statusColorMap[status]
        )}
      >
        <p className="line-clamp-1">{title}</p>
        <div className="flex items-center gap-x-1 overflow-hidden">
          <MembersAvatar name={assignee?.name} />
          <div className="bg-black size-1 rounded-full" />
          <ProjectAvatar
            name={project?.name}
            image={project?.imageUrl}
            className="w-[1.32rem] h-[1.32rem]"
          />
        </div>
      </div>
    </div>
  );
};
