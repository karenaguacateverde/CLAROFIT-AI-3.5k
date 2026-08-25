import type { ReactNode } from 'react';
import { BottomNav } from '@/components/app/ui';

export default function AppInternaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="pb-24">{children}</div>
      <BottomNav />
    </div>
  );
}
