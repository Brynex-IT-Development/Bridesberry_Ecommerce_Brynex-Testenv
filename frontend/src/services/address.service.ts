import { apiFetch } from './api';

export interface CustomerAddressItem {
  id: string;
  type: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  createdAt?: string;
}

export async function getCustomerAddresses(): Promise<CustomerAddressItem[]> {
  try {
    const data = await apiFetch<CustomerAddressItem[]>('/api/auth/addresses');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function addCustomerAddress(address: {
  type?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  phone?: string;
}): Promise<CustomerAddressItem | null> {
  try {
    return await apiFetch<CustomerAddressItem>('/api/auth/addresses', {
      method: 'POST',
      body: JSON.stringify(address),
    });
  } catch {
    return null;
  }
}

export async function deleteCustomerAddress(id: string): Promise<boolean> {
  try {
    await apiFetch(`/api/auth/addresses/${id}`, { method: 'DELETE' });
    return true;
  } catch {
    return false;
  }
}
