export declare enum PurchaseOrderStatus {
    DRAFT = "Draft",
    SENT = "Sent",
    PARTIALLY_RECEIVED = "Partially_Received",
    RECEIVED = "Received",
    CANCELLED = "Cancelled"
}
export declare class UpdatePOStatusBodyDto {
    status: PurchaseOrderStatus;
}
