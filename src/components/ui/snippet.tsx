import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface SnippetProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  codeString: string;
  asChild?: boolean;
  length?: number;
}

const Snippet = React.forwardRef<HTMLButtonElement, SnippetProps>(
  ({ className, length = 40, asChild = false, codeString, ...props }, ref) => {
    const [wasCopied, setWasCopied] = React.useState(false);

    const Comp = asChild ? Slot : "button";

    const handleCopy = () => {
      navigator.clipboard.writeText(codeString);
      setWasCopied(true);
      setTimeout(() => setWasCopied(false), 2000);
    };

    return (
      <Comp
        className={cn(
          "inline-flex font-mono bg-primary text-primary-foreground items-center justify-between rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
          className,
        )}
        ref={ref}
        onClick={() => handleCopy()}
        {...props}
      >
        {"$ " + codeString.slice(0, length) + "..."}
        {!wasCopied && <Copy className="hover:text-accent" />}
        {wasCopied && <Check className="animate-pulse" />}
      </Comp>
    );
  },
);
Snippet.displayName = "Snippet";

export { Snippet };
