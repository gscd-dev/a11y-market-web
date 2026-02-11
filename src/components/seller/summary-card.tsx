import { Card } from '@/components/ui/card';

interface SummaryCardProps {
  label: string;
  value: string | number;
}

export function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <Card className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm'>
      <div className='flex flex-col'>
        <span className='text-xs font-medium text-slate-500'>{label}</span>
        <span className='mt-3 text-xl font-semibold text-slate-900'>{value}</span>
      </div>
    </Card>
  );
}
