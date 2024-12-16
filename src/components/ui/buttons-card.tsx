import { FC, JSX, ReactNode } from "react";

export const ButtonsCard: FC<{
  text: string;
  subtext: string;
  children: ReactNode;
}> = ({ text, subtext, children }): JSX.Element => (
  <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-xl">
    <h2 className="text-3xl font-bold text-white mb-2 text-center">{text}</h2>
    <p className="text-gray-300 mb-8 text-center">{subtext}</p>
    <div className="space-y-4">{children}</div>
  </div>
);
