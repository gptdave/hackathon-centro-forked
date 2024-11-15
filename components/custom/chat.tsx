"use client";

import { ChangeEvent, useCallback, useRef } from "react";
import { Paperclip, Send, StopCircle } from "lucide-react";
import { Attachment, Message } from "ai";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

// Agregamos el tipo explícito
interface SuggestedAction {
  label: string;
  action: () => void;
}

const suggestedActions: SuggestedAction[] = [];

interface MultimodalInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (event?: { preventDefault?: () => void }, chatRequestOptions?: any) => Promise<void>;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: (attachments: Array<Attachment>) => void;
  messages: Array<Message>;
  append: (message: Message) => void;
}

export function Chat({
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop,
  attachments,
  setAttachments,
  messages,
  append,
}: MultimodalInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      }
    },
    []
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const filesArray = Array.from(e.target.files).map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          file: file
        })) as Array<Attachment>;
        setAttachments(filesArray);
      }
    },
    [setAttachments]
  );

  return (
    <div className="relative">
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2">
          {attachments.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded bg-secondary p-2"
            >
              <span className="text-sm">{file.name}</span>
              <button
                onClick={() => {
                  setAttachments(attachments.filter((_, j) => j !== i));
                }}
                className="text-sm hover:text-destructive"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="relative flex items-end w-full gap-2">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          placeholder="Escribe tu mensaje..."
          className="min-h-[60px] w-full p-4 pr-20 focus-visible:ring-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-4 bottom-4 flex gap-2">
          <label className="cursor-pointer">
            <Paperclip className="h-4 w-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="mt-2 flex gap-2 justify-end">
        {isLoading && (
          <Button
            variant="outline"
            onClick={() => {
              stop();
              setInput("");
            }}
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Detener generación
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={input.trim().length === 0}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Send className="mr-2 h-4 w-4" />
          Enviar mensaje
        </Button>
      </div>
    </div>
  );
}
