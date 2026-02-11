export const addressKeys = {
  all: ['address'] as const,
  list: () => [...addressKeys.all, 'list'] as const,
  default: () => [...addressKeys.all, 'default'] as const,
};
