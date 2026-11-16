import * as express from 'express';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, VerifyOtpDto, ResendOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private setRefreshCookie;
    private clearRefreshCookie;
    signup(dto: SignupDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, req: express.Request, res: express.Response, ip: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    refresh(req: express.Request, res: express.Response, ip: string): Promise<{
        accessToken: string;
        user: any;
    }>;
    logout(req: express.Request, res: express.Response): Promise<{
        message: string;
    }>;
    me(user: any, req: express.Request, ip: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
        };
    }>;
    updateProfile(user: any, dto: {
        firstName?: string;
        lastName?: string;
    }): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: import("../generated/prisma/enums").UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
        };
    }>;
    getAddresses(user: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string | null;
    }[]>;
    addAddress(user: any, dto: {
        type?: string;
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zipCode: string;
        country?: string;
        phone?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string | null;
    }>;
    deleteAddress(user: any, addressId: string): Promise<{
        success: boolean;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
