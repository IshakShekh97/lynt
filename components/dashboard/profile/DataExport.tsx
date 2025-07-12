"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShakeElement } from "@/components/ui/brutal-effects";
import { Download, FileText, Loader2 } from "lucide-react";
import { User as UserType } from "better-auth";

interface DataExportProps {
  user: UserType & {
    username?: string;
    bio?: string;
  };
}

export function DataExport({ user }: DataExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    try {
      setIsExporting(true);

      // Simulate data export - in a real app, this would call an API
      const userData = {
        profile: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          bio: user.bio,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        exportDate: new Date().toISOString(),
        exportVersion: "1.0",
      };

      // Create and download the file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `lynt-data-export-${user.username}-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h4 className="font-bold">What&apos;s included in your export:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Profile information</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Account settings</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Links and social connections</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Analytics data</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Your data will be exported as a JSON file containing all your account
          information. This file can be used for backup purposes or to import
          your data into other services.
        </p>
      </div>

      <ShakeElement>
        <Button
          onClick={handleExportData}
          disabled={isExporting}
          className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Exporting Data...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Export My Data
            </>
          )}
        </Button>
      </ShakeElement>
    </div>
  );
}
