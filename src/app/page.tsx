import { LlmConfigDialog } from "@/components/llm-config-dialog";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      <LlmConfigDialog />
    </div>
  );
}
