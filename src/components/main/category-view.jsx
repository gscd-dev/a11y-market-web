import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link, useNavigate } from '@tanstack/react-router';

export function CategoryView({ categories, products, onSelectCategory }) {
  const navigate = useNavigate();

  return (
    <>
      <header
        className='my-8 flex h-16 w-full flex-wrap items-center bg-neutral-300 px-16 text-2xl font-bold dark:bg-neutral-500'
        aria-label='카테고리 선택'
      >
        {categories.map((category) => {
          return (
            <Button
              key={category.id}
              variant='link'
              className='mx-2'
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          );
        })}
      </header>
      <div className='grid w-full grid-cols-1 gap-4 px-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6'>
        {products.map((product) => (
          <Link
            className='p-1'
            to='/products/$productId'
            params={{ productId: product.id }}
            key={product.id}
          >
            <Card className='overflow-hidden pt-0 transition-transform hover:-translate-y-1 hover:opacity-90 hover:shadow-lg'>
              <CardContent className='flex aspect-square items-center justify-center p-0'>
                <div className='h-full w-full bg-neutral-400'></div>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-2 p-4'>
                <span className='text-lg font-semibold'>{product.title}</span>
                <span className='text-md font-bold text-neutral-600'>{product.price + '원'}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <Button
        variant='default'
        className='mx-auto mt-4 w-3xs px-8 hover:opacity-80'
        onClick={() => navigate({ to: '/products' })}
      >
        전체 상품 보기
      </Button>
    </>
  );
}
