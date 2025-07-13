"use client";

import React, { useState, useCallback } from "react";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Crop, Move, Square } from "lucide-react";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";

interface ImageCropperDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  isProcessing?: boolean;
}

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function ImageCropperDialog({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  isProcessing = false,
}: ImageCropperDialogProps) {
  const [cropData, setCropData] = useState<Area | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleCropChange = useCallback((pixels: Area | null) => {
    setCropData(pixels);
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleCrop = useCallback(async () => {
    if (!cropData || !imageSrc) return;

    try {
      // Create a canvas to draw the cropped image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to desired output size
      const outputSize = 400;
      canvas.width = outputSize;
      canvas.height = outputSize;

      // Create an image element
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // Calculate the scale factor
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        // Apply scaling to crop coordinates
        const scaledCrop = {
          x: cropData.x * scaleX,
          y: cropData.y * scaleY,
          width: cropData.width * scaleX,
          height: cropData.height * scaleY,
        };

        // Draw the cropped portion of the image
        ctx.drawImage(
          img,
          scaledCrop.x,
          scaledCrop.y,
          scaledCrop.width,
          scaledCrop.height,
          0,
          0,
          outputSize,
          outputSize
        );

        // Convert canvas to blob
        canvas.toBlob(
          (blob: Blob | null) => {
            if (blob) {
              onCropComplete(blob);
            }
          },
          "image/jpeg",
          0.9 // High quality
        );
      };

      img.src = imageSrc;
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  }, [cropData, imageSrc, onCropComplete]);

  const handleReset = useCallback(() => {
    setCropData(null);
    setZoom(1);
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-4xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mx-2 sm:mx-4 p-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10">
        <AlertDialogHeader className="p-4 sm:p-6 border-b-4 border-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
          <ShakeElement intensity="medium" trigger="hover">
            <AlertDialogTitle className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-center text-white">
              <GlitchText intensity="medium" trigger="hover">
                <Crop className="inline h-6 w-6 sm:h-8 sm:w-8 mr-2 mb-1" />
                ✂️ BRUTAL CROP ZONE
              </GlitchText>
            </AlertDialogTitle>
          </ShakeElement>
          <AlertDialogDescription className="text-center font-bold text-white text-sm sm:text-base">
            💥 Crop your image to perfection! Use mouse/touch to move and resize
            the crop area.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Cropper Container */}
          <BrutalBox className="relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black/5">
            <Cropper
              className="h-64 sm:h-80 lg:h-96 w-full"
              image={imageSrc}
              aspectRatio={1}
              onCropChange={handleCropChange}
              onZoomChange={handleZoomChange}
              zoom={zoom}
            >
              <CropperDescription>
                Crop your profile image to the perfect square
              </CropperDescription>
              <CropperImage />
              <CropperCropArea className="border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
            </Cropper>

            {/* Floating controls */}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                size="sm"
                onClick={handleReset}
                disabled={isProcessing}
                className={cn(
                  "font-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                  "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                )}
              >
                <Square className="h-4 w-4" />
              </Button>
            </div>
          </BrutalBox>

          {/* Controls Info */}
          <BrutalBox className="p-3 sm:p-4 bg-black/10 border-2 border-black">
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold text-muted-foreground justify-center">
              <span className="flex items-center gap-1">
                <Move className="h-3 w-3" />
                Drag to move & resize
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Square className="h-3 w-3" />
                Reset crop area
              </span>
              <span>•</span>
              <span>Scroll to zoom</span>
            </div>
          </BrutalBox>
        </div>

        <AlertDialogFooter className="p-4 sm:p-6 border-t-4 border-black bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={onClose}
            disabled={isProcessing}
            className="font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all order-2 sm:order-1"
          >
            💀 CANCEL
          </Button>
          <Button
            onClick={handleCrop}
            disabled={isProcessing}
            className={cn(
              "font-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all order-1 sm:order-2",
              "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            )}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                PROCESSING...
              </>
            ) : (
              <>
                <Crop className="h-4 w-4 mr-2" />
                💥 CROP & UPLOAD
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
