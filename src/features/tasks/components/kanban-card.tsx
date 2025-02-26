import { MoreHorizontal } from "lucide-react";
import { Task } from "../types";
import { TaskActions } from "./task-actions";
import { DottedSeparator } from "@/components/dotted-separator";
import { MembersAvatar } from "@/features/members/components/members-avatar";
import { TaskDate } from "./task-date";
import { ProjectAvatar } from "@/features/projects/components/projects-avatar";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded-lg shadow-sm space-y-3 text-black hover:bg-slate-300">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id ?? ""}>
          <MoreHorizontal className="rounded-lg size-[18px] stroke-1 shrink-0 text-neutral-700" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MembersAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-black" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      {task.projectId === "" ||
      task.projectId === null ||
      task.projectId === undefined ? (
        <p className="text-muted-foreground text-xs">No project assigned</p>
      ) : (
        <div className="flex items-center gap-x-1.5">
          <ProjectAvatar
            name={task.project?.name}
            image={task.project?.imageUrl}
            className="w-[1.32rem] h-[1.32rem]"
            fallbackClassName="text-[10px]"
          />
          <span className="text-xs font-medium">
            {task.project?.name}
          </span>
        </div>
      )}
    </div>
  );
};
