import { useState, type ReactNode } from 'react';

export function Tabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return <div><div className="mb-8 flex flex-wrap gap-2">{items.map((item, index) => <button key={item.label} onClick={() => setActive(index)} className={active === index ? 'bg-acid px-3 py-2 font-mono text-xs text-ink' : 'border border-current px-3 py-2 font-mono text-xs'}>{item.label}</button>)}</div>{items[active].content}</div>;
}