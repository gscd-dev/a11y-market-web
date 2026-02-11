export interface Address {
  addressId: string;
  userId: string;
  addressName: string;
  receiverName: string;
  receiverPhone: string;
  receiverZipcode: string;
  receiverAddr1: string;
  receiverAddr2: string;
  isDefault: boolean;
  createdAt: string;
}

export interface AddressRequest {
  addressName: string;
  receiverName: string;
  receiverPhone: string;
  receiverZipcode: string;
  receiverAddr1: string;
  receiverAddr2: string;
  isDefault: boolean;
}
