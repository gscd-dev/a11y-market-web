import { Badge } from '@/components/ui/badge';

interface ClaimTypeBadgeProps {
  type: string;
}

export function ClaimTypeBadge({ type }: ClaimTypeBadgeProps) {
  const map: Record<string, string> = {
    취소: 'bg-amber-50 text-amber-700 border-amber-200',
    반품: 'bg-rose-50 text-rose-700 border-rose-200',
    교환: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return (
    <Badge
      variant='outline'
      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
        map[type] ?? 'border-slate-200 bg-slate-50 text-slate-700'
      }`}
    >
      {type}
    </Badge>
  );
}
