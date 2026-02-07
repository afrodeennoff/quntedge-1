import Navbar from "./navbar";
import Footer from "./footer";
import { cn } from "@/lib/utils";

type MarketingLayoutShellProps = Readonly<{
  children: React.ReactNode;
  contentClassName?: string;
  className?: string;
}>;

export default function MarketingLayoutShell({
  children,
  contentClassName = "mx-auto w-full max-w-7xl",
  className,
}: MarketingLayoutShellProps) {
  return (
    <div className={cn("min-h-screen w-full overflow-x-hidden", className)}>
      <Navbar />
      <div className={cn("mt-8 sm:mt-20", contentClassName)}>{children}</div>
      <Footer />
    </div>
  );
}
