import { CategoryView } from '@/components/main/category-view';
import { MainCarousel } from '@/components/main/main-carousel';
import { PopularRanking } from '@/components/main/popular-ranking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {

  return (
    <main className='font-kakao-big flex min-h-screen w-full flex-col items-center'>
      <MainCarousel />
      <PopularRanking />
      <CategoryView />
      <section className='mt-16 flex w-full flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-700'>
        <div className='flex w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center'>
          <h2 className='w-full text-4xl font-bold'>왜 A11yMARKET 일까요?</h2>
          <p className='mt-4 w-full text-xl'>
            우리 플랫폼은 누구나 쉽게 쇼핑할 수 있는 환경을 만드는 데 집중하고 있습니다.
          </p>
        </div>
        <div className='grid w-full max-w-5xl grid-cols-1 gap-8 px-4 pb-16 sm:grid-cols-2'>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:accessibility'
                className='size-12 text-blue-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>누구나 사용할 수 있는 디자인</CardTitle>
              <CardDescription>
                우리 서비스는 다양한 제약을 가진 사용자들도 쉽게 접근하고 이용할 수 있도록
                설계되었습니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:search'
                className='size-12 text-green-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>접근성 중심의 상품 탐색</CardTitle>
              <CardDescription>
                나의 요구에 맞는 상품을 빠르고 정확하게 찾을 수 있도록 도와드립니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:customer-service'
                className='size-12 text-yellow-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>신뢰할 수 있는 고객 지원</CardTitle>
              <CardDescription>
                필요한 순간 언제든 도움을 드릴 준비가 되어 있습니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:arrow-up-bold-hexagon-outline'
                className='size-12 text-purple-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>사용자 의견을 반영한 서비스 개선</CardTitle>
              <CardDescription>
                여러분의 목소리는 서비스 발전의 가장 중요한 기준입니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </main>
  );
}
