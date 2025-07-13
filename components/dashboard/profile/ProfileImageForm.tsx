"use client";

import React, { useState } from "react";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ImageCropperDialog } from "@/components/ui/image-cropper-dialog";
import { toast } from "sonner";
import { Upload, Trash2, Camera } from "lucide-react";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProfileImageFormProps {
  currentImage?: string | null;
  userName: string;
  onImageUpdate?: (imageUrl: string | null) => void;
}

export function ProfileImageForm({
  currentImage,
  userName,
  onImageUpdate,
}: ProfileImageFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageForCropping, setImageForCropping] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    // Create preview URL for cropping
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageForCropping(imageUrl);
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileRemove = () => {
    // Clean up blob URL if it exists
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    if (imageForCropping && imageForCropping.startsWith("blob:")) {
      URL.revokeObjectURL(imageForCropping);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setImageForCropping(null);
    setIsCropperOpen(false);
  };

  const handleCropperClose = () => {
    setIsCropperOpen(false);
    // Don't clear imageForCropping here so user can re-open cropper
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    // Convert blob to file
    const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });

    // Create preview URL from cropped image
    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreviewUrl(croppedUrl);

    // Update selected file with cropped version
    setSelectedFile(croppedFile);

    // Close cropper
    setIsCropperOpen(false);
    setImageForCropping(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);

    // Show loading toast
    const loadingToast = toast.loading("🔥 Uploading your brutal image...", {
      description: "This might take a moment, stay awesome!",
    });

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/profile-image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const result = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("💥 Profile image updated successfully!", {
        description: "Your new brutal look is now live!",
        duration: 4000,
      });

      onImageUpdate?.(result.imageUrl);

      // Clean up blob URL if it exists
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      // Clear the form and close dialog
      setSelectedFile(null);
      setPreviewUrl(null);
      setImageForCropping(null);
      setIsDialogOpen(false);

      // Refresh the page to show the new image immediately
      setTimeout(() => {
        router.refresh();
      }, 1000); // Small delay to let the toast show
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.error("Error uploading image:", error);
      toast.error("💀 Failed to upload image", {
        description: "Something went wrong. Please try again!",
        duration: 4000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentImage) {
      toast.error("No profile image to delete");
      return;
    }

    setIsDeleting(true);

    // Show loading toast
    const loadingToast = toast.loading("🗑️ Deleting your profile image...", {
      description: "Removing your brutal look...",
    });

    try {
      const response = await fetch("/api/profile-image/delete", {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("💀 Profile image deleted successfully!", {
        description: "Your profile image has been removed.",
        duration: 4000,
      });

      onImageUpdate?.(null);

      // Refresh the page to show the changes immediately
      setTimeout(() => {
        router.refresh();
      }, 1000); // Small delay to let the toast show
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      console.error("Error deleting image:", error);
      toast.error("💥 Failed to delete image", {
        description: "Something went wrong. Please try again!",
        duration: 4000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const displayImage = currentImage;
  const initials =
    userName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <BrutalBox className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-full">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="text-center space-y-1 sm:space-y-2">
          <ShakeElement intensity="medium" trigger="hover">
            <GlitchText
              className="text-lg sm:text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight"
              intensity="medium"
              trigger="hover"
            >
              📸 PROFILE IMAGE
            </GlitchText>
          </ShakeElement>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold">
            Upload, update, or delete your brutal profile image
          </p>
        </div>

        {/* Current Image Display */}
        <div className="flex justify-center">
          <div className="relative">
            <ShakeElement intensity="low" trigger="hover">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <AvatarImage src={displayImage || ""} alt={userName} />
                <AvatarFallback className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </ShakeElement>

            {displayImage && (
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 lg:-top-2 lg:-right-2">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 bg-green-500 text-white p-0.5 sm:p-1 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Upload Button with Alert Dialog */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className={cn(
                  "w-full font-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-xs sm:text-sm lg:text-base",
                  "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                )}
              >
                <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                💥 {displayImage ? "CHANGE IMAGE" : "UPLOAD IMAGE"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-sm lg:max-w-md border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mx-2 sm:mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg lg:text-xl font-black uppercase text-center">
                  📸 Upload Profile Image
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center font-bold text-xs sm:text-sm">
                  Choose a brutal image to represent your digital identity!
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-3 sm:space-y-4">
                {!previewUrl ? (
                  <FileDropzone
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    preview={previewUrl}
                    disabled={isUploading}
                    showPreview={false}
                    className="border-2 border-black"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Cropped preview"
                        className="h-32 w-32 object-cover border-2 border-black rounded"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (imageForCropping) {
                            setIsCropperOpen(true);
                          }
                        }}
                        className="flex-1 font-black border-2 border-black"
                      >
                        ✂️ RE-CROP
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleFileRemove}
                        className="flex-1 font-black border-2 border-black"
                      >
                        🗑️ REMOVE
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <AlertDialogCancel
                  className="font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm lg:text-base order-2 sm:order-1"
                  onClick={() => {
                    handleFileRemove();
                  }}
                >
                  💀 CANCEL
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className={cn(
                    "font-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-xs sm:text-sm lg:text-base order-1 sm:order-2",
                    isUploading
                      ? "bg-gradient-to-r from-orange-500 to-red-600"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  )}
                >
                  {isUploading ? (
                    <>
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent mr-2" />
                        <span className="animate-pulse">🔥 UPLOADING...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      💥 UPLOAD NOW
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete Button */}
          {currentImage && (
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className={cn(
                "w-full font-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-xs sm:text-sm lg:text-base"
              )}
            >
              {isDeleting ? (
                <>
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent mr-2" />
                    <span className="animate-pulse">🗑️ DELETING...</span>
                  </div>
                </>
              ) : (
                <>
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  💀 DELETE IMAGE
                </>
              )}
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="bg-black/10 border-2 border-black p-2 sm:p-3 rounded">
          <p className="text-xs text-muted-foreground text-center font-bold">
            ⚡ Supported formats: PNG, JPG, JPEG, GIF, WebP • Max size: 5MB
            <br />
            💾 Images are stored securely in the database
          </p>
        </div>
      </div>

      {/* Image Cropper Dialog */}
      {imageForCropping && (
        <ImageCropperDialog
          isOpen={isCropperOpen}
          onClose={handleCropperClose}
          imageSrc={imageForCropping}
          onCropComplete={handleCropComplete}
          isProcessing={isUploading}
        />
      )}
    </BrutalBox>
  );
}
