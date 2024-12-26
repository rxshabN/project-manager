"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface joinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

const JoinWorkspaceForm = ({ initialValues }: joinWorkspaceFormProps) => {
  const inviteCode = useInviteCode();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();
  const onSubmit = () => {
    mutate(
      {
        param: {
          workspaceId,
        },
        json: {
          code: inviteCode,
        },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>{" "}
          workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex items-center gap-2 justify-between flex-col lg:flex-row">
          <Button
            className="w-full lg:w-fit"
            variant="secondary"
            size="lg"
            type="button"
            disabled={isPending}
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            type="button"
            className="w-full lg:w-fit"
            onClick={onSubmit}
            disabled={isPending}
          >
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
