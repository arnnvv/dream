"use client";

import { JSX, KeyboardEvent, useRef, useState } from "react";
import { FormComponent } from "./FormComponent";
import { createTreck } from "@/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const AddTrecks = (): JSX.Element => {
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const formRef = useRef<HTMLFormElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setImageUrls((prev) => [...prev, ""]);
      setTimeout(() => {
        lastInputRef.current?.focus();
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleUrlChange = (index: number, value: string) => {
    setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)));
  };

  const removeUrl = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FormComponent action={createTreck}>
      <form className="space-y-6" ref={formRef}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            className="mt-1"
            placeholder="Enter treck title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            className="mt-1"
            rows={4}
            placeholder="Describe your treck"
          />
        </div>

        <div>
          <Label>Image URLs</Label>
          <div className="space-y-2 mt-1">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  ref={
                    index === imageUrls.length - 1 ? lastInputRef : undefined
                  }
                  name="imageUrl"
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="Enter image URL and press Enter for more"
                  className="flex-1"
                />
                {imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUrl(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Press Enter for new input, Ctrl+Enter to submit
          </p>
        </div>

        <Button type="submit" className="w-full">
          Create Treck
        </Button>
      </form>
    </FormComponent>
  );
};
