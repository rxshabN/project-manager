"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
};
