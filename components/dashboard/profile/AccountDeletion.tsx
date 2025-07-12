"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ShakeElement } from "@/components/ui/brutal-effects";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { User as UserType } from "better-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AccountDeletionProps {
  user: UserType & {
    username?: string;
    bio?: string;
  };
}

export function AccountDeletion({ user }: AccountDeletionProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationsChecked, setConfirmationsChecked] = useState({
    understood: false,
    exported: false,
    permanent: false,
  });
  const [showDialog, setShowDialog] = useState(false);

  const expectedConfirmation = "DELETE";
  const allConfirmationsChecked =
    Object.values(confirmationsChecked).every(Boolean);
  const canDelete =
    confirmationText === expectedConfirmation && allConfirmationsChecked;

  const handleDelete = async () => {
    if (!canDelete) return;

    try {
      setIsDeleting(true);

      // Use better-auth delete user method
      await authClient.deleteUser();

      toast.success(
        "Account deletion initiated. Please check your email for confirmation."
      );
      setShowDialog(false);
    } catch (error) {
      console.error("Account deletion failed:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setConfirmationText("");
    setConfirmationsChecked({
      understood: false,
      exported: false,
      permanent: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
          <h4 className="font-bold text-destructive mb-2">
            What happens when you delete your account:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Your profile will be permanently removed</li>
            <li>All your links and social connections will be deleted</li>
            <li>Your analytics data will be permanently lost</li>
            <li>
              Your username &quot;{user.username}&quot; will become available
              for others
            </li>
            <li>You will be signed out from all devices</li>
            <li>This action cannot be undone</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200">
                Before you proceed
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Make sure you have exported your data if you want to keep a
                copy. Consider downloading any important links or information
                you might need later.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <ShakeElement>
            <Button
              variant="destructive"
              onClick={() => {
                resetForm();
                setShowDialog(true);
              }}
              className="w-full h-12 text-lg font-bold border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Delete My Account
            </Button>
          </ShakeElement>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-w-md border-4 border-red-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please confirm you understand the
              consequences.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="understood"
                  checked={confirmationsChecked.understood}
                  onChange={(e) =>
                    setConfirmationsChecked((prev) => ({
                      ...prev,
                      understood: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 border-2 border-black rounded"
                />
                <Label htmlFor="understood" className="text-sm leading-relaxed">
                  I understand that deleting my account is permanent and cannot
                  be undone.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="exported"
                  checked={confirmationsChecked.exported}
                  onChange={(e) =>
                    setConfirmationsChecked((prev) => ({
                      ...prev,
                      exported: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 border-2 border-black rounded"
                />
                <Label htmlFor="exported" className="text-sm leading-relaxed">
                  I have exported my data or I don&apos;t need it.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="permanent"
                  checked={confirmationsChecked.permanent}
                  onChange={(e) =>
                    setConfirmationsChecked((prev) => ({
                      ...prev,
                      permanent: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 border-2 border-black rounded"
                />
                <Label htmlFor="permanent" className="text-sm leading-relaxed">
                  I understand that all my data will be permanently deleted.
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmation" className="text-sm font-bold">
                Type &quot;{expectedConfirmation}&quot; to confirm:
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder={expectedConfirmation}
                className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={resetForm}
              className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!canDelete || isDeleting}
              className="bg-destructive hover:bg-destructive/90 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
