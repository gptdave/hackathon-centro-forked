// ... existing code ...
import { MultimodalInput } from "@/components/custom/chat";

export default function ChatPage({ params }) {
  // ... state and handlers ...

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
