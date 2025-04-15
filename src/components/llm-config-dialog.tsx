import { LlmTemperatureSlider } from "./llm-temperature-slider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function LlmConfigDialog() {
  return (
    <Dialog>
      <DialogTrigger className="hover:brightness-90 transition-all duration-300 hover:cursor-pointer bg-gradient-to-b rounded-lg border px-4 py-1 text-xs from-blue-500 to-blue-700 text-gray-50 border-blue-600 font-medium">
        Configure LLM
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>LLM Configuration</DialogTitle>
          <DialogDescription>
            Set up preferences for your LLM responses.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-black">Model</Label>
          <p className="text-xs text-black/50">
            Select the language model to be used.
          </p>
          <Select defaultValue="gpt-4.1">
            <SelectTrigger className="w-full bg-black/5 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="gpt-4.1" className="rounded-lg">
                GPT-4.1
              </SelectItem>
              <SelectItem
                value="gemini-2.5-pro-preview-03-25"
                className="rounded-lg"
              >
                Gemini 2.5 Pro
              </SelectItem>
              <SelectItem
                value="claude-3-7-sonnet-20250219"
                className="rounded-lg"
              >
                Claude 3.7 Sonnet
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-black">System Prompt</Label>
          <p className="text-xs text-black/50">
            Define the model’s behavior before the conversation starts.
          </p>
          <Textarea className="min-h-60 rounded-xl bg-black/5" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-black">Temperature</Label>
          <p className="text-xs text-black/50">
            Controls randomness in responses. Higher values make outputs more
            creative.
          </p>
          <LlmTemperatureSlider />
        </div>
        <DialogFooter>
          <Button className="hover:brightness-90 transition-all h-auto duration-300 hover:cursor-pointer bg-gradient-to-b rounded-lg border px-4 py-1 text-xs from-blue-500 to-blue-700 text-gray-50 border-blue-600 font-medium">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
