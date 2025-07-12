"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  accept?: string;
  maxSize?: number;
  preview?: string | null;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean;
}

export function FileDropzone({
  onFileSelect,
  onFileRemove,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  preview,
  disabled = false,
  className,
  showPreview = true,
}: FileDropzoneProps) {
  const [dragError, setDragError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    if (!file.type.startsWith("image/")) {
      return "Invalid file type. Please select an image file.";
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setDragError(error);
      return;
    }

    setDragError(null);
    onFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center",
          isDragActive && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "hover:border-primary hover:bg-primary/5",
          dragError && "border-destructive bg-destructive/5"
        )}
      >
        {/* Content when no preview or showPreview is false */}
        {(!preview || !showPreview) && (
          <div className="text-center space-y-4">
            <div className="mx-auto">
              {dragError ? (
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              ) : (
                <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here, or click to select"}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: PNG, JPG, JPEG, GIF, WebP (max{" "}
                {Math.round(maxSize / 1024 / 1024)}MB)
              </p>
            </div>
          </div>
        )}

        {/* Preview when showPreview is true and preview exists */}
        {showPreview && preview && (
          <div className="relative w-full h-full min-h-[150px] flex items-center justify-center">
            <Image
              src={preview}
              alt="Preview"
              width={150}
              height={150}
              className="max-w-full max-h-[150px] object-contain rounded"
              unoptimized={preview.startsWith("data:")}
            />
            {onFileRemove && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileRemove();
                  setDragError(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {dragError && (
        <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{dragError}</p>
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      {!preview && (
        <div className="mt-4 text-center">
          <Button type="button" variant="outline" size="sm" disabled={disabled}>
            <FileImage className="h-4 w-4 mr-2" />
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
}
