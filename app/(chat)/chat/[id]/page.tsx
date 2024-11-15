import { useState } from 'react';
import { Message } from 'ai';
import { MultimodalInput } from "@/components/custom/chat";

export default function ChatPage({
  params,
}: {
  params: { id: string; formData: Record<string, string> };
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Your submit logic here
  };

  const stop = () => {
    // Your stop logic here
  };

  const append = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <MultimodalInput
      key={params.id}
      id={params.id}
      initialMessages={[]}
      formData={params.formData}
      input={input}
      setInput={setInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      stop={stop}
      attachments={attachments}
      setAttachments={setAttachments}
      messages={messages}
      append={append}
    />
  );
}
