import { apiFetch } from "@/services/api";
import { PurchaseOrder } from "@/types/purchase-order";

export interface ReceivePOPayload {
  receivedBy: string;
  notes?: string;
  items: { sku: string; quantityReceived: number }[];
}

function normalizePO(po: any): PurchaseOrder {
  if (!po) return po;
  let attachments: string[] = [];
  if (Array.isArray(po.attachments)) {
    attachments = po.attachments;
  } else if (typeof po.attachments === "string" && po.attachments.trim()) {
    try {
      const parsed = JSON.parse(po.attachments);
      attachments = Array.isArray(parsed) ? parsed : [po.attachments];
    } catch {
      attachments = [po.attachments];
    }
  }
  return {
    ...po,
    attachments,
  };
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  try {
    const data = await apiFetch<any[]>("/api/purchase-orders");
    return Array.isArray(data) ? data.map(normalizePO) : [];
  } catch {
    return [];
  }
}

export async function getPurchaseOrderById(id: string): Promise<PurchaseOrder | undefined> {
  try {
    const data = await apiFetch<any>(`/api/purchase-orders/${id}`);
    return data ? normalizePO(data) : undefined;
  } catch {
    return undefined;
  }
}

export async function createPurchaseOrder(payload: Omit<PurchaseOrder, "id">): Promise<PurchaseOrder> {
  const formattedPayload = {
    ...payload,
    attachments: Array.isArray(payload.attachments)
      ? JSON.stringify(payload.attachments)
      : typeof payload.attachments === "string"
      ? payload.attachments
      : "[]",
  };
  const data = await apiFetch<any>("/api/purchase-orders", {
    method: "POST",
    body: JSON.stringify(formattedPayload),
  });
  return normalizePO(data);
}

export async function updatePurchaseOrder(
  id: string,
  payload: Partial<PurchaseOrder>
): Promise<PurchaseOrder> {
  const formattedPayload = {
    ...payload,
    ...(payload.attachments !== undefined
      ? {
          attachments: Array.isArray(payload.attachments)
            ? JSON.stringify(payload.attachments)
            : typeof payload.attachments === "string"
            ? payload.attachments
            : "[]",
        }
      : {}),
  };
  const data = await apiFetch<any>(`/api/purchase-orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(formattedPayload),
  });
  return normalizePO(data);
}

export async function updatePurchaseOrderStatus(
  id: string,
  status: string
): Promise<PurchaseOrder> {
  const data = await apiFetch<any>(`/api/purchase-orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return normalizePO(data);
}

export async function receivePurchaseOrderItems(
  id: string,
  payload: ReceivePOPayload
): Promise<{ receiptId: string; status: string }> {
  return apiFetch(`/api/purchase-orders/${id}/receive`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
