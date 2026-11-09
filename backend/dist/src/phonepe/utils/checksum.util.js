"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecksumUtil = void 0;
const crypto = __importStar(require("crypto"));
class ChecksumUtil {
    static generatePayChecksum(base64Payload, apiEndpoint, saltKey, saltIndex) {
        const dataToHash = base64Payload + apiEndpoint + saltKey;
        const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
        return `${hash}###${saltIndex}`;
    }
    static generateStatusChecksum(merchantId, merchantTransactionId, saltKey, saltIndex) {
        const dataToHash = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;
        const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
        return `${hash}###${saltIndex}`;
    }
    static generateCallbackChecksum(base64Response, saltKey, saltIndex) {
        const dataToHash = base64Response + saltKey;
        const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
        return `${hash}###${saltIndex}`;
    }
    static verifyCallbackSignature(base64Response, xVerifyHeader, saltKey, saltIndex) {
        const expectedHeader = this.generateCallbackChecksum(base64Response, saltKey, saltIndex);
        return expectedHeader === xVerifyHeader;
    }
}
exports.ChecksumUtil = ChecksumUtil;
//# sourceMappingURL=checksum.util.js.map