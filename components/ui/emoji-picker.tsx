"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { Theme } from "emoji-picker-react";

// Dynamically import emoji picker to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

interface EmojiPickerComponentProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji?: string;
  theme?: Theme;
}

export const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({
  onEmojiSelect,
  selectedEmoji,
  theme = Theme.AUTO,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    onEmojiSelect(emojiData.emoji);
    setShowPicker(false);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative" ref={pickerRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setShowPicker(!showPicker)}
        className="h-9 w-9 p-0"
      >
        {selectedEmoji ? (
          <span className="text-base">{selectedEmoji}</span>
        ) : (
          <Smile className="h-4 w-4" />
        )}
      </Button>

      {showPicker && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={theme}
            width={300}
            height={400}
            previewConfig={{
              showPreview: false,
            }}
          />
        </div>
      )}
    </div>
  );
};
