import { cn } from "@/lib/utils";
import { HTMLAttributes, JSX } from "react";

export const BackgroundGradient = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 background-animate",
      className,
    )}
    {...props}
  />
);
