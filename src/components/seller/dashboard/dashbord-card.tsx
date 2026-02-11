import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

export const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <Card className='rounded-2xl shadow-sm transition-shadow hover:shadow-md'>
      <CardHeader className='pb-2'>
        <CardTitle>
          <h3 className='text-base font-bold'>{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
      </CardContent>
    </Card>
  );
};
