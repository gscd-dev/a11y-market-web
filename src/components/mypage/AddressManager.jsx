import AddressList from '@/components/address/address-list';
import DefaultAddress from '@/components/address/default-address';
import NewAddressForm from '@/components/address/new-address-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

export const AddressManager = () => {
  const [activeTab, setActiveTab] = useState('default');
  const [editingAddress, setEditingAddress] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      addressName: '우리집',
      receiverName: '홍길동',
      zipcord: '12345',
      address1: '서울시 강남구 테헤란로 123',
      address2: '101동 1001호',
      phone: '010-1234-5678',
      isDefault: true,
    },
    {
      id: 2,
      addressName: '회사',
      receiverName: '홍길동',
      zipcord: '67890',
      address1: '서울시 서초구 서초대로 456',
      address2: '5층',
      phone: '010-9876-5432',
      isDefault: false,
    },
  ]);

  const handleEdit = (addr) => setEditingAddress(addr);
  const handleDelete = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const handleSave = (form) => {
    if (form.id) {
      setAddresses((prev) => prev.map((a) => (a.id === form.id ? { ...a, ...form } : a)));
    } else {
      const nextId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
      setAddresses((prev) => [...prev, { ...form, id: nextId }]);
    }
    setEditingAddress(null);
  };

  const defaultAddr = addresses.find((a) => a.isDefault) || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>배송지 관리</CardTitle>
        <CardDescription className='text-lg'>배송지를 등록/관리 할 수 있습니다.</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue='default'
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            setEditingAddress(null);
          }}
          className='w-full'
        >
          <TabsList className='mb-0 grid h-12 w-full grid-cols-3'>
            <TabsTrigger value='default'>기본배송지</TabsTrigger>
            <TabsTrigger value='new'>신규배송지</TabsTrigger>
            <TabsTrigger value='list'>배송지목록</TabsTrigger>
          </TabsList>

          {/* 기본배송지 */}
          <TabsContent value='default'>
            {editingAddress?.id === defaultAddr?.id ? (
              <NewAddressForm
                initialForm={editingAddress}
                onSave={handleSave}
                onCancel={() => setEditingAddress(null)}
              />
            ) : (
              <DefaultAddress
                defaultAddress={defaultAddr}
                onEdit={handleEdit}
              />
            )}
          </TabsContent>

          {/* 신규배송지 */}
          <TabsContent value='new'>
            <NewAddressForm
              onSave={handleSave}
              onCancel={() => setEditingAddress(null)}
            />
          </TabsContent>

          {/* 배송지 목록 */}
          <TabsContent value='list'>
            {editingAddress ? (
              <NewAddressForm
                initialForm={editingAddress}
                onSave={handleSave}
                onCancel={() => setEditingAddress(null)}
              />
            ) : (
              <AddressList
                addresses={addresses}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
