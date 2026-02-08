const ESellerSubmitStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
}

export type SellerSubmitStatus = keyof typeof ESellerSubmitStatus;