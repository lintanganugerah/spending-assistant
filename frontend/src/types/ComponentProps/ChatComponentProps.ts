import { ChatBoxType } from "types/ChatTypes";

export type ChatBoxProps = {
  MaxWords?: number;
  TextInformationBottom?: string;
  PlaceHolderText?: string;
  value: { purchaseReason: string };
  Error?: Record<string, string> | undefined;
  MaxRows?: number;
  onChange: ({ purchaseReason }: ChatBoxType) => void;
  onSubmit: () => void;
};

export type BubbleChatProps = {
  text: string;
};

export type ReasoningBoxProps = {
  header: string;
  body: string;
  timeElapsed: number;
};
