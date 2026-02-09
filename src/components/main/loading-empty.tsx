import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '../ui/spinner';

export const LoadingEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Spinner 
            className='size-16'
          />
        </EmptyMedia>
        <EmptyTitle className='text-3xl font-bold'>로딩 중 입니다.</EmptyTitle>
        <EmptyDescription className='text-lg'>잠시만 기다려주세요.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
