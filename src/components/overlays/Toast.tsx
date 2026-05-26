import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useEffect } from "react";

const AUTO_DISMISS_MS = 1000;

const TYPE_STYLES = {
  error: {
    container: "border-rose-500/60 bg-rose-950/95 text-rose-50",
    icon: "text-rose-400",
    Icon: AlertCircle,
  },
  success: {
    container: "border-emerald-500/60 bg-emerald-950/95 text-emerald-50",
    icon: "text-emerald-400",
    Icon: CheckCircle2,
  },
  info: {
    container: "border-slate-500/60 bg-slate-800/95 text-slate-100",
    icon: "text-slate-400",
    Icon: Info,
  },
} as const;

export type ToastType = keyof typeof TYPE_STYLES;

interface ToastProps {
  isOpen: boolean;
  close: () => void;
  message: string;
  type: ToastType;
}

export function Toast({ isOpen, close, message, type }: ToastProps) {
  const { container, icon, Icon } = TYPE_STYLES[type];

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(close, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div
        role="alert"
        className={[
          "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm",
          container,
        ].join(" ")}
      >
        <Icon className={`mt-0.5 size-4 shrink-0 ${icon}`} aria-hidden />
        <p className="text-sm font-medium leading-snug">{message}</p>
      </div>
    </div>
  );
}
