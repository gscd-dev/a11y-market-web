import { useUpdateMySellerInfo } from '@/api/seller/mutations';
import { useDashboardStats } from '@/api/seller/queries';
import { useGetProfile } from '@/api/user/queries';
import { ErrorEmpty } from '@/components/main/error-empty';
import { DashboardCard } from '@/components/seller/dashboard/dashbord-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@tanstack/react-router';
import { Podcast, Tag } from 'lucide-react';
import { useState } from 'react';

export const DashboardStatSection = () => {
  const { data: user } = useGetProfile();
  const { data } = useDashboardStats();

  const { mutateAsync: updateSellerInfo } = useUpdateMySellerInfo();

  const [sellerFormData, setSellerFormData] = useState({
    sellerName: '',
    sellerIntro: '',
  });
  const [submiting, setSubmitting] = useState(false);
  const [sellerInfoDialogOpen, setSellerInfoDialogOpen] = useState(false);

  const format = (num: number) => {
    return num?.toLocaleString() || '0';
  };

  const handleChangeSellerInfo = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateSellerInfo({
        sellerName: sellerFormData.sellerName,
        sellerIntro: sellerFormData.sellerIntro,
      });
    } finally {
      setSubmitting(false);
      setSellerInfoDialogOpen(false);
    }
  };

  if (!data)
    return (
      <ErrorEmpty
        message='판매자 정보를 불러올 수 없습니다.'
        prevPath='/seller'
      />
    );

  return (
    <section className='mb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 md:flex-row md:gap-4'>
        <Item
          variant='outline'
          className='flex flex-2 rounded-xl p-8 shadow-sm transition-shadow hover:shadow-md'
        >
          <ItemContent>
            <ItemTitle>
              <h1 className='text-2xl'>{`${data.sellerName}`}</h1>
            </ItemTitle>
            <ItemDescription className='text-gray-600'>{user?.userEmail}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog
              open={sellerInfoDialogOpen}
              onOpenChange={setSellerInfoDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant='outline'>판매자 정보 수정</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleChangeSellerInfo}>
                  <DialogHeader>
                    <DialogTitle>
                      <h2 className='text-lg font-medium'>판매자 정보 수정</h2>
                    </DialogTitle>
                    <DialogDescription>판매자의 정소를 수정할 수 있습니다.</DialogDescription>
                  </DialogHeader>
                  <div className='mt-4'>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor='sellerName'>판매자명</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id='sellerName'
                            type='text'
                            value={sellerFormData.sellerName}
                            onChange={(e) =>
                              setSellerFormData({
                                ...sellerFormData,
                                sellerName: e.target.value,
                              })
                            }
                          />
                          <InputGroupAddon>
                            <Tag />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor='sellerIntro'>판매자 소개</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id='sellerIntro'
                            rows={4}
                            value={sellerFormData.sellerIntro}
                            onChange={(e) =>
                              setSellerFormData({
                                ...sellerFormData,
                                sellerIntro: e.target.value,
                              })
                            }
                          />
                          <InputGroupAddon>
                            <Podcast />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    </FieldGroup>
                  </div>
                  <DialogFooter className='mt-4'>
                    <DialogClose asChild>
                      <Button variant='outline'>취소</Button>
                    </DialogClose>
                    <Button
                      type='submit'
                      disabled={submiting}
                    >
                      {submiting ? <Spinner /> : '저장'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>

        <Card className='flex-1 rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-base'>빠른 작업</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-3'>
            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/products/new'>상품 등록하기</Link>
            </Button>

            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/products'>내 상품 관리</Link>
            </Button>

            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/orders'>주문 접수 관리</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          title='총 매출액'
          value={`${format(data.totalRevenue)}원`}
        />
        <DashboardCard
          title='총 주문 수'
          value={`${format(data.totalOrders)}건`}
        />
        <DashboardCard
          title='구매 확정률'
          value={`${data.confirmedRate?.toFixed(2) || '0'}%`}
        />
        <DashboardCard
          title='취소/환불 비율'
          value={`${data.refundRate?.toFixed(2) || '0'}%`}
        />
      </div>
    </section>
  );
};
