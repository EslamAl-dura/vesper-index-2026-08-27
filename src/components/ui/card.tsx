import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('border-2 border-current', className)} {...props} />);
Card.displayName = 'Card';