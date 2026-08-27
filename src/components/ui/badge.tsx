import { cn } from '../../lib/utils';

export function Badge({ children, className }: { children: string; className?: string }) {
  return <span className={cn('inline-block border border-current px-2 py-1 font-mono text-[10px] uppercase tracking-widest', className)}>{children}</span>;
}