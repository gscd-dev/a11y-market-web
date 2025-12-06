import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'fashion', name: '패션' },
  { id: 'electronics', name: '전자기기' },
  { id: 'home', name: '홈·리빙' },
  { id: 'beauty', name: '뷰티' },
];

const ratings = [
  { value: 4.5, label: '4.5★ 이상' },
  { value: 4.0, label: '4.0★ 이상' },
  { value: 3.5, label: '3.5★ 이상' },
  { value: 3.0, label: '3.0★ 이상' },
];

export const ProductFilter = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const handleCategoryToggle = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);
    applyFilters(searchQuery, newCategories, minRating);
  };

  const handleRatingChange = (rating) => {
    const newRating = minRating === rating ? 0 : rating;
    setMinRating(newRating);
    applyFilters(searchQuery, selectedCategories, newRating);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, selectedCategories, minRating);
  };

  const applyFilters = (query, cats, rating) => {
    onFilterChange({
      searchQuery: query,
      categories: cats,
      minRating: rating,
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMinRating(0);
    onFilterChange({
      searchQuery: '',
      categories: [],
      minRating: 0,
    });
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategories.length > 0 || minRating > 0;

  return (
    <div className='space-y-6 rounded-lg bg-white p-6 shadow-sm'>
      {/* 헤더 */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg'>상세 검색</h2>
        {hasActiveFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleReset}
            className='gap-2'
          >
            <X className='size-4' />
            초기화
          </Button>
        )}
      </div>

      {/* 검색어 */}
      <div className='space-y-2'>
        <Label htmlFor='search-input'>상품명 검색</Label>
        <div className='relative'>
          <Search
            className='absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400'
            aria-hidden='true'
          />
          <Input
            id='search-input'
            type='search'
            placeholder='상품명을 입력하세요'
            className='pl-10'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* 카테고리 */}
      <div className='space-y-3'>
        <Label>카테고리</Label>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex items-center gap-2'
            >
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className='cursor-pointer'
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
