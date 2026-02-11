import { useDeleteCartItems, useUpdateCartItem } from '@/api/cart/mutations';
import type { CartItem, CartItemGroup } from '@/api/cart/types';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CartGroupProps {
  groupData: CartItemGroup;
  onGroupDelete: (sellerId: string) => void;
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  onChangeQuantity: (cartItemId: string, quantity: number) => void;
}

export const CartGroup = ({
  groupData,
  onGroupDelete,
  selectedItems,
  setSelectedItems,
  onChangeQuantity,
}: CartGroupProps) => {
  const [data, setData] = useState<CartItem[]>(groupData.items);
  const updateCartItem = useUpdateCartItem();
  const deleteCartItems = useDeleteCartItems();

  const handleSelectItem = (cartItemId: string, isSelected: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (isSelected) {
        updatedSelectedItems.add(cartItemId);
      } else {
        updatedSelectedItems.delete(cartItemId);
      }
      return updatedSelectedItems;
    });
  };

  //판매자 그룹 안에서만 동작하도록 수정
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = data.map((item) => item.cartItemId);

      setSelectedItems((prev) => {
        const updated = new Set(prev);
        allIds.forEach((id) => updated.add(id));
        return updated;
      });
    } else {
      const allIds = data.map((item) => item.cartItemId);

      setSelectedItems((prev) => {
        const updated = new Set(prev);
        allIds.forEach((id) => updated.delete(id));
        return updated;
      });
    }
  };

  const handleChangeQuantity = async (index: number, cartItemId: string, amount: number) => {
    const oldData = data[index];
    const newQty = oldData.quantity + amount;

    if (newQty < 1) return;

    const newData = [...data];
    newData[index] = { ...oldData, quantity: newQty };
    setData(newData);

    onChangeQuantity(cartItemId, newQty);

    const resp = await updateCartItem.mutateAsync({
      itemId: cartItemId,
      quantity: newData[index].quantity,
    });

    onChangeQuantity(cartItemId, resp.quantity);
  };

  const handleDelete = async (index: number) => {
    const newData = [...data];
    const removedItems = newData.splice(index, 1);

    await deleteCartItems.mutateAsync(removedItems.map((item) => item.cartItemId));

    setData(newData);

    setSelectedItems((prev) => {
      const updated = new Set<string>();
      prev.forEach((id) => {
        if (!removedItems.some((r) => r.cartItemId === id)) {
          updated.add(id);
        }
      });
      return updated;
    });

    toast.success('상품이 삭제되었습니다.');

    if (newData.length === 0) {
      onGroupDelete(groupData.sellerId);
    }
  };

  return (
    <div className='bg-card text-card-foreground w-full overflow-hidden rounded-md border'>
      <Table className='table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[5%] py-4 text-center'>
              <Checkbox
                checked={data.every((item) => selectedItems.has(item.cartItemId))}
                onCheckedChange={(isSelected) => handleSelectAll(isSelected === true)}
                className='size-6'
              />
            </TableHead>
            <TableHead
              colSpan={5}
              className='w-[95%] text-2xl font-bold'
            >
              {data[0]?.sellerName}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className='w-[5%] py-2 text-center text-lg font-bold'>선택</TableHead>
            <TableHead className='w-[10%] truncate py-2 text-center text-lg font-bold'>
              상품 이미지
            </TableHead>
            <TableHead className='w-[40%] py-2 text-lg font-bold'>상품명</TableHead>
            <TableHead className='w-[15%] py-2 text-center text-lg font-bold'>수량</TableHead>
            <TableHead className='w-[20%] py-2 text-center text-lg font-bold'>가격</TableHead>
            <TableHead className='w-[10%] py-2 text-center text-lg font-bold'>삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.cartItemId}>
              <TableCell className='w-[5%] text-center'>
                <Checkbox
                  checked={selectedItems.has(item.cartItemId)}
                  onCheckedChange={(isSelected) =>
                    handleSelectItem(item.cartItemId, isSelected === true)
                  }
                  className='size-6'
                />
              </TableCell>
              <TableCell className='w-[10%]'>
                <a
                  href={`/products/${item.productId}`}
                  className='block'
                >
                  <ImageWithFallback
                    src={item.productImageUrl}
                    alt={item.productName}
                    className='aspect-4/3 w-28 rounded-md object-cover'
                  />
                </a>
              </TableCell>
              <TableCell className='w-[40%]'>
                <div className='flex flex-col gap-2'>
                  <span className='line-clamp-1 overflow-hidden text-lg font-bold text-ellipsis whitespace-nowrap'>
                    {item.productName}
                  </span>
                </div>
              </TableCell>
              <TableCell className='w-[15%] text-center'>
                <ButtonGroup className='mx-auto'>
                  <Button
                    variant='outline'
                    className='w-8'
                    onClick={() => handleChangeQuantity(index, item.cartItemId, -1)}
                  >
                    <MinusIcon className='size-4' />
                  </Button>
                  <Input
                    className='bg-card text-card-foreground w-8 p-0 text-center'
                    value={item.quantity}
                    readOnly
                  />
                  <Button
                    variant='outline'
                    className='w-8'
                    onClick={() => handleChangeQuantity(index, item.cartItemId, 1)}
                  >
                    <PlusIcon className='size-4' />
                  </Button>
                </ButtonGroup>
              </TableCell>
              <TableCell className='w-[20%] text-center text-lg'>
                ₩{(item.productPrice * item.quantity).toLocaleString('ko-KR')}
              </TableCell>
              <TableCell className='w-[10%] text-center'>
                <Button
                  variant='ghost'
                  className='text-foreground size-12 hover:bg-neutral-200 hover:text-red-500 dark:hover:bg-neutral-700'
                  onClick={() => handleDelete(index)}
                >
                  <TrashIcon className='size-6' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
