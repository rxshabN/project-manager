import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { OverviewPropery } from "./overview-property";
import { MembersAvatar } from "@/features/members/components/members-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useUpdateTaskModal();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4 bg-neutral-200">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button size="sm" variant="secondary" onClick={() => open(task.$id)}>
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewPropery label="Assignee">
            <MembersAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewPropery>
          <OverviewPropery label="Due date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewPropery>
          <OverviewPropery label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewPropery>
        </div>
      </div>
    </div>
  );
};
