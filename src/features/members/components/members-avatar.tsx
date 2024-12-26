import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MembersAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MembersAvatar = ({
  name,
  className,
  fallbackClassName,
}: MembersAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "size-5 rounded-full transition border border-neutral-300",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
