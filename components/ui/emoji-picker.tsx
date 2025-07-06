"use client";

import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
  value?: string;
  onChange: (emoji: string) => void;
  disabled?: boolean;
}

interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export function EmojiPicker({ value, onChange, disabled }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const handleEmojiSelect = (emoji: EmojiData) => {
    onChange(emoji.native);
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className="w-full justify-start"
        >
          {value ? (
            <span className="text-lg mr-2">{value}</span>
          ) : (
            <Smile className="h-4 w-4 mr-2" />
          )}
          {value ? "Change emoji" : "Choose emoji"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose an emoji</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme={theme === "dark" ? "dark" : "light"}
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
        {value && (
          <div className="flex justify-center mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
            >
              Clear emoji
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EmojiPicker;
