"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant="secondary" size="sm" onClick={handleClick}>
        Back to home
      </Button>
    </div>
  );
};

export default ErrorPage;
