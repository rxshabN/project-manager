import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import { TaskStatus } from "../types";

interface TaskDateProps {
  value: string;
  className?: string;
  status: TaskStatus;
}

export const TaskDate = ({ value, className, status }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  let textColor = "text-muted-foreground";
  if (status === "DONE") {
    textColor = "text-black";
  } else if (diffInDays <= 3) {
    textColor = "text-red-500";
  } else if (diffInDays <= 7) {
    textColor = "text-orange-500";
  } else if (diffInDays <= 14) {
    textColor = "text-yellow-500";
  }
  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};
