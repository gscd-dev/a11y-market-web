import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const EMPTY_FORM = {
  id: undefined,
  addressName: '',
  receiverName: '',
  zipcord: '',
  address1: '',
  address2: '',
  phone: '',
  isDefault: false,
};

export default function NewAddressForm({ initialForm = null, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initialForm) {
      setForm((prev) => ({ ...prev, ...initialForm }));
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialForm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!form.addressName || !form.receiverName || !form.zipcord || !form.address1) {
      alert('배송지명, 수령인, 우편번호(또는 우편코드), 주소(주소1)는 필수입니다.');
      return;
    }
    onSave && onSave(form);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    onCancel && onCancel();
  };

  return (
    <>
      <Card>
        <CardContent>
          <form
            className='space-y-4'
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htlmFor='addressName'
                    className='w-16'
                  >
                    배송지명
                  </FieldLabel>
                  <Input
                    id='addressName'
                    name='addressName'
                    value={form.addressName}
                    onChange={handleChange}
                    placeholder='예: 우리집, 회사 등'
                    className='w-64'
                  />
                  <Label>
                    <Checkbox
                      name='isDefault'
                      checked={!!form.isDefault}
                      onCheckedChange={(checked) =>
                        setForm((prev) => ({ ...prev, isDefault: checked }))
                      }
                    />
                    기본배송지로 설정
                  </Label>
                </div>
              </Field>

              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htmlFor='receiverName'
                    className='w-16'
                  >
                    수령인
                  </FieldLabel>
                  <Input
                    id='receiverName'
                    name='receiverName'
                    value={form.receiverName}
                    onChange={handleChange}
                    placeholder='수령인 이름'
                    className='w-64'
                  />
                </div>
              </Field>

              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htmlFor='phone'
                    className='w-16'
                  >
                    연락처
                  </FieldLabel>
                  <Input
                    id='phone'
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                    placeholder='01012345678'
                    className='w-64'
                  />
                </div>
              </Field>

              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htmlFor='zipcord'
                    className='w-16'
                  >
                    우편번호
                  </FieldLabel>
                  <Input
                    id='zipcord'
                    name='zipcord'
                    value={form.zipcord}
                    onChange={handleChange}
                    placeholder='예: 12345'
                    className='w-64'
                  />
                </div>
              </Field>

              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htmlFor='address1'
                    className='w-16'
                  >
                    주소1
                  </FieldLabel>
                  <Input
                    id='address1'
                    name='address1'
                    value={form.address1}
                    onChange={handleChange}
                    placeholder='도로명/지번'
                    className='w-100'
                  />
                </div>
              </Field>

              <Field>
                <div className='flex items-center gap-2'>
                  <FieldLabel
                    htmlFor='address2'
                    className='w-16'
                  >
                    주소2
                  </FieldLabel>
                  <Input
                    id='address2'
                    name='address2'
                    value={form.address2}
                    onChange={handleChange}
                    placeholder='상세주소 예: 101동 1001호'
                    className='w-100'
                  />
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className='mt-8 flex justify-center gap-2'>
        <Button
          onClick={handleSubmit}
          variant='default'
        >
          {form.id ? '수정 저장' : '저장하기'}
        </Button>
        <Button
          type='button'
          onClick={handleReset}
          variant='outline'
        >
          초기화
        </Button>
      </div>
    </>
  );
}
