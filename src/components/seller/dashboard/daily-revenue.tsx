import { useDailyRevenue } from '@/api/seller/queries';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChartLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const DashboardDailyRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(`2025-11`);
  const [data, setData] = useState<{ date: string; sales: number }[]>([]);

  const [selectedYear, selectedMonth] = selectedPeriod.split('-');
  const { data: dailyRevenue } = useDailyRevenue(Number(selectedYear), Number(selectedMonth));

  useEffect(() => {
    (async () => {
      const formattedData = dailyRevenue?.map((item) => ({
        date: new Date(item.date).toLocaleDateString('ko-KR'),
        sales: item.revenue,
      }));

      setData(formattedData ?? []);
    })();
  }, [dailyRevenue]);

  const format = (number: number) => new Intl.NumberFormat('ko-KR').format(number);

  return (
    <section className='bg-card mb-8 rounded-2xl border p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <h2 className='text-sm font-semibold'>매출 추이</h2>
          <p className='text-muted-foreground mt-0.5 text-xs'>
            선택한 연도와 월 기준 일별 매출액입니다.
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className='h-8 rounded border px-3 text-xs'>
              <SelectValue placeholder='기간 선택' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>2025</SelectLabel>
                <SelectItem value='2025-11'>2025년 11월</SelectItem>
                <SelectItem value='2025-12'>2025년 12월</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='h-64'>
        {data.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia
                variant='icon'
                className='mb-0 flex size-24 rounded-full bg-neutral-200 dark:bg-neutral-800'
              >
                <ChartLine className='size-12' />
              </EmptyMedia>
              <EmptyTitle className='text-3xl font-bold'>매출 추이 데이터가 없습니다.</EmptyTitle>
              <EmptyDescription className='text-lg'>
                선택한 기간에 대한 매출 정보가 없습니다.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='date'
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(value: number) => `${format(value)}원`}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Line
                type='monotone'
                dataKey='sales'
                stroke='#4b5563'
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};
