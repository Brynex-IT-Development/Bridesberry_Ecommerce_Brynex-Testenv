export declare class ChecksumUtil {
    static generatePayChecksum(base64Payload: string, apiEndpoint: string, saltKey: string, saltIndex: number): string;
    static generateStatusChecksum(merchantId: string, merchantTransactionId: string, saltKey: string, saltIndex: number): string;
    static generateCallbackChecksum(base64Response: string, saltKey: string, saltIndex: number): string;
    static verifyCallbackSignature(base64Response: string, xVerifyHeader: string, saltKey: string, saltIndex: number): boolean;
}
