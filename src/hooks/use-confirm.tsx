import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import { ResponsiveModal } from "@/components/responsive-modal";

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary"
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };
  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const confirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="h-full w-full shadow-none border-none">
        <CardContent className="pt-4">
          <CardTitle className="px-2 mt-5 text-3xl">{title}</CardTitle>
          <CardDescription className="mt-2 text-base px-2">
            {message}
          </CardDescription>
          <CardHeader>
            <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full lg:w-auto"
              >
                Confirm
              </Button>
            </div>
          </CardHeader>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );
  return [confirmationDialog, confirm];
};
