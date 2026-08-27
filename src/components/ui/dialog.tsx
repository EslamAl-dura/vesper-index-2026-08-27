import { type ReactNode } from 'react';

export function Dialog({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-6" onClick={onClose}><div className="max-w-lg border-2 border-acid bg-paper p-8 text-ink shadow-acid" onClick={(event) => event.stopPropagation()}>{children}</div></div>;
}