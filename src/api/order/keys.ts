export const orderKeys = {
  all: ['orders'] as const,
  list: () => [...orderKeys.all, 'list'] as const,
  detail: (orderItemId: string | number) => [...orderKeys.all, 'detail', orderItemId] as const,
};
