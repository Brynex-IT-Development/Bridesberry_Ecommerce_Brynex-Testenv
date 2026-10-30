import { Vendor, VendorAddress } from "@/types/vendor";
import { apiFetch } from "@/services/api";

type VendorWithRelations = Vendor & {
  addresses?: (VendorAddress & { type: string })[];
};

const EMPTY_ADDRESS: VendorAddress = {
  attention: "",
  countryRegion: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  fax: "",
};

function mapVendorRelations(vendor: VendorWithRelations): Vendor {
  const addresses = vendor.addresses ?? [];

  return {
    ...vendor,
    billingAddress:
      vendor.billingAddress ??
      addresses.find((address) => address.type === "BILLING") ??
      { ...EMPTY_ADDRESS },
    shippingAddress:
      vendor.shippingAddress ??
      addresses.find((address) => address.type === "SHIPPING") ??
      { ...EMPTY_ADDRESS },
    contactPersons: vendor.contactPersons ?? vendor.contacts ?? [],
  };
}

export async function getVendors(): Promise<Vendor[]> {
  try {
    const data = await apiFetch<Vendor[]>("/api/vendors");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  try {
    const vendor = await apiFetch<VendorWithRelations>(`/api/vendors/${id}`);
    return mapVendorRelations(vendor);
  } catch {
    return undefined;
  }
}

export async function createVendor(payload: Record<string, any>): Promise<Vendor> {
  return apiFetch<Vendor>("/api/vendors", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateVendor(id: string, payload: Partial<Vendor>): Promise<Vendor> {
  return apiFetch<Vendor>(`/api/vendors/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteVendor(id: string): Promise<void> {
  await apiFetch<void>(`/api/vendors/${id}`, { method: "DELETE" });
}
