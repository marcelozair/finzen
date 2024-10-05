import { ReactNode } from "react"

interface TitleViewProps {
  children: ReactNode;
}

export const TitleView = ({ children }: TitleViewProps) => {
  return (
    <h2 className="text-xl font-bold text-title-font">{children}</h2>
  );
}