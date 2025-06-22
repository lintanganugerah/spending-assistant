import { MainPageTitleProps } from "../types/ComponentProps/MainPageTitleProps";

export function MainPageTitle({ Title, Subtitle }: MainPageTitleProps) {
  return (
    <>
      <div className="text-6xl font-black mb-2">{Title}</div>
      <div className="font-light mb-12 max-w-md text-center">{Subtitle}</div>
    </>
  );
}
