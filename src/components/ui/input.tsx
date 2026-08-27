import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn('w-full border-b-2 border-current bg-transparent px-1 py-3 font-mono text-sm outline-none placeholder:opacity-50 focus:border-acid', className)} {...props} />);
Input.displayName = 'Input';