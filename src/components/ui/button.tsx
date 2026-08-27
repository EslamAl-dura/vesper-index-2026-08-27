import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn('inline-flex items-center justify-center rounded-none border-2 border-current px-5 py-3 font-mono text-xs uppercase tracking-widest transition hover:-translate-y-1 hover:shadow-acid disabled:opacity-50', className)} {...props} />
));
Button.displayName = 'Button';