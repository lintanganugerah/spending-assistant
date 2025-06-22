export type ChatBoxProps = {
  MaxWords?: number;
  TextInformationBottom?: string;
  PlaceHolderText?: string;
  value: string;
  MaxRows?: number;
  onChange: (value: string) => void;
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
