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
        "size-5 rounded-full transition border border-white/[0.55]",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-black font-medium text-white flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
