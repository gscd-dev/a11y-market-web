export const mainKeys = {
  all: ['main'] as const,
  events: () => [...mainKeys.all, 'events'] as const,
  populars: () => [...mainKeys.all, 'populars'] as const,
  categories: () => [...mainKeys.all, 'categories'] as const,
  productsByCategory: (categoryId: string) =>
    [...mainKeys.all, 'productsByCategory', categoryId] as const,
};
