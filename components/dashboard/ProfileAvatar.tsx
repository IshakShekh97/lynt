"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ProfileAvatarProps {
  currentImage?: string;
  userName: string;
  onImageUpdate?: (imageUrl: string) => void;
}

export default function ProfileAvatar({
  currentImage,
  userName,
  onImageUpdate,
}: ProfileAvatarProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);

      // In a real app, you would upload to a cloud storage service here
      // For now, we'll just use the data URL
      onImageUpdate?.(result);

      toast.success("Avatar updated successfully!");
      setIsUploading(false);
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageUpdate?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Avatar removed");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayImage = previewImage || currentImage;
  const initials =
    userName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Avatar className="h-24 w-24 transition-all group-hover:brightness-75">
          <AvatarImage src={displayImage} alt={userName} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={triggerFileInput}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Remove button for existing images */}
        {displayImage && (
          <Button
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="text-center space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {displayImage ? "Change Avatar" : "Upload Avatar"}
        </Button>

        <p className="text-xs text-muted-foreground">
          JPG, PNG or GIF • Max 5MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
