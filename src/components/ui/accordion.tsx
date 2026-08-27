import { useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';

export function AccordionItem({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="border-t-2 border-current py-5"><button className="flex w-full items-center justify-between text-left text-xl" onClick={() => setOpen(!open)}>{title}<Plus className={open ? 'rotate-45 transition' : 'transition'} /></button>{open && <p className="max-w-2xl pt-4 font-mono text-sm leading-7 opacity-70">{children}</p>}</div>;
}