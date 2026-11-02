import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly smtpTransporter: Transporter | null = null;
  private readonly senderEmail: string;
  private readonly senderName: string;

  constructor(private configService: ConfigService) {
    this.senderName =
      this.configService.get<string>('SMTP_FROM_NAME') || 'Brides Berry';

    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPass = this.configService.get<string>('SMTP_PASS');
    const smtpHost =
      this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com';
    const smtpPort =
      Number(this.configService.get<string>('SMTP_PORT')) || 465;
    const smtpSecure =
      this.configService.get<string>('SMTP_SECURE') !== 'false';

    this.senderEmail =
      this.configService.get<string>('SMTP_FROM_EMAIL') ||
      smtpUser ||
      'no-reply@bridesberry.com';

    if (smtpUser && smtpPass) {
      this.smtpTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
      this.logger.log(
        `SMTP Email Provider initialized (${smtpHost}:${smtpPort}) for ${this.senderEmail}.`,
      );
    } else {
      this.logger.warn(
        'SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env. Emails will be logged locally to console & logs/sent-emails.log.',
      );
    }
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, subject, html, text } = options;

    let emailSent = false;
    const fromAddress = `"${this.senderName}" <${this.senderEmail}>`;

    // 1. Send via Nodemailer SMTP (App Password / Mail server)
    if (this.smtpTransporter) {
      try {
        await this.smtpTransporter.sendMail({
          from: fromAddress,
          to,
          subject,
          html,
          text,
        });
        this.logger.log(`Email successfully sent to ${to} via SMTP.`);
        emailSent = true;
      } catch (error) {
        const stack = error instanceof Error ? error.stack : '';
        this.logger.error(
          `Failed to send email to ${to} via SMTP: ${stack}`,
        );
      }
    }

    // 2. Fallback local development behavior when SMTP is not configured or failed
    if (!emailSent) {
      const isProduction =
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'staging';

      this.logger.log('==================================================');
      this.logger.log(`LOCAL EMAIL OUTBOX - Subject: "${subject}"`);
      this.logger.log(`To: ${to}`);
      if (!isProduction) {
        // Extract OTP or details from HTML if safe to log
        const otpMatch = html.match(/<span[^>]*>(\d{6})<\/span>/);
        if (otpMatch) {
          this.logger.log(`VERIFICATION CODE (OTP): ${otpMatch[1]}`);
        }
      }
      this.logger.log('==================================================');

      // Write to sent-emails.log for testing validation
      try {
        const scratchDir =
          this.configService.get<string>('EMAIL_LOG_DIR') ||
          path.join(process.cwd(), 'logs');
        if (!fs.existsSync(scratchDir)) {
          fs.mkdirSync(scratchDir, { recursive: true });
        }
        const logFile = path.join(scratchDir, 'sent-emails.log');
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] To: ${to} | Subject: ${subject}\nBody:\n${html}\n\n==================================================\n\n`;
        fs.appendFileSync(logFile, logEntry);
      } catch (err) {
        this.logger.error(
          'Failed to write email to logs/sent-emails.log:',
          err,
        );
      }
    }
  }

  async sendOrderConfirmation(order: any, customer: { firstName: string | null; lastName: string | null; email: string }): Promise<void> {
    const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Customer';
    
    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #FAF9F6; font-size: 13px; color: #111111;">${item.name} ${item.variantName ? `(${item.variantName})` : ''}</td>
        <td style="padding: 10px; border-bottom: 1px solid #FAF9F6; font-size: 13px; color: #111111; font-family: monospace;">${item.sku}</td>
        <td style="padding: 10px; border-bottom: 1px solid #FAF9F6; font-size: 13px; color: #111111; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #FAF9F6; font-size: 13px; color: #111111; text-align: right; font-family: monospace;">₹${Number(item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const template = `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">Brides Berry</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; border-bottom: 2px solid #e8dbb4; padding-bottom: 10px;">Order Confirmation</h2>
          <p style="font-size: 14px; color: #333333;">Dear ${customerName},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #555555;">Thank you for your order! We have received your booking. Below are your order details:</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #faf8f2; border: 1px solid #e8dbb4; font-size: 13px; line-height: 1.5;">
            <strong>Order Number:</strong> ${order.orderNumber}<br />
            <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br />
            <strong>Status:</strong> ${order.status}<br />
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #111111; color: #ffffff;">
                <th style="padding: 10px; font-size: 12px; font-weight: bold; text-align: left; text-transform: uppercase;">Item</th>
                <th style="padding: 10px; font-size: 12px; font-weight: bold; text-align: left; text-transform: uppercase;">SKU</th>
                <th style="padding: 10px; font-size: 12px; font-weight: bold; text-align: center; text-transform: uppercase;">Qty</th>
                <th style="padding: 10px; font-size: 12px; font-weight: bold; text-align: right; text-transform: uppercase;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="width: 250px; margin-left: auto; font-size: 13px; line-height: 1.8; border-top: 1px solid #e8dbb4; padding-top: 10px; text-align: right;">
            <div><strong>Subtotal:</strong> ₹${Number(order.subtotal).toFixed(2)}</div>
            <div><strong>GST (3%):</strong> ₹${Number(order.taxTotal).toFixed(2)}</div>
            \${Number(order.shippingCharge) > 0 ? \`<div><strong>Shipping:</strong> ₹\${Number(order.shippingCharge).toFixed(2)}</div>\` : ''}
            \${Number(order.discountAmount) > 0 ? \`<div style="color: #b91c1c;"><strong>Discount:</strong> -₹\${Number(order.discountAmount).toFixed(2)}</div>\` : ''}
            <div style="font-size: 15px; font-weight: bold; color: #c59b27; border-top: 1px solid #e8dbb4; margin-top: 5px; padding-top: 5px;">
              <strong>Total:</strong> ₹${Number(order.total).toFixed(2)}
            </div>
          </div>

          <p style="font-size: 12px; line-height: 1.6; color: #888888; margin-top: 30px; border-top: 1px solid #fafafa; padding-top: 20px;">If you have any questions or require modifications, please contact our concierge team.</p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: customer.email,
      subject: `Order Confirmation - ${order.orderNumber} - Brides Berry`,
      html: template,
    });
  }

  async sendAdminOrderNotification(order: any, customer: { firstName: string | null; lastName: string | null; email: string }): Promise<void> {
    const adminEmail = this.configService.get<string>('ADMIN_NOTIFICATION_EMAIL') || 'admin@jewelrybybridesberry.com';
    const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Guest Customer';

    const template = `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">Brides Berry</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #b91c1c; border-bottom: 2px solid #e8dbb4; padding-bottom: 10px;">New Order Alert!</h2>
          <p style="font-size: 14px; color: #333333;">Hello Admin,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #555555;">A new order has been placed by a customer. Details are listed below:</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #faf8f2; border: 1px solid #e8dbb4; font-size: 13px; line-height: 1.6;">
            <strong>Order Number:</strong> ${order.orderNumber}<br />
            <strong>Customer:</strong> ${customerName} (${customer.email})<br />
            <strong>Total Amount:</strong> ₹${Number(order.total).toFixed(2)}<br />
            <strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}<br />
          </div>

          <div style="text-align: center; margin-top: 25px;">
            <a href="http://localhost:3000/admin/orders/${order.id}" style="background-color: #c59b27; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 13px; font-weight: bold; text-transform: uppercase; border-radius: 4px; display: inline-block;">View Order in Dashboard</a>
          </div>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: adminEmail,
      subject: `[ALERT] New Order ${order.orderNumber} placed`,
      html: template,
    });
  }

  async sendLowStockAlert(sku: string, productName: string, variantName: string | null, currentStock: number): Promise<void> {
    const adminEmail = this.configService.get<string>('ADMIN_NOTIFICATION_EMAIL') || 'admin@jewelrybybridesberry.com';
    const isOutOfStock = currentStock === 0;

    const template = `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">Brides Berry</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: \${isOutOfStock ? '#b91c1c' : '#c59b27'}; border-bottom: 2px solid #e8dbb4; padding-bottom: 10px;">
            \${isOutOfStock ? '⚠️ Product Out Of Stock!' : '⚠️ Low Stock Warning'}
          </h2>
          <p style="font-size: 14px; color: #333333;">Hello Admin,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #555555;">
            The inventory count for the following product is critically low or has run out entirely:
          </p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #faf8f2; border: 1px solid #e8dbb4; font-size: 13px; line-height: 1.6;">
            <strong>Product:</strong> ${productName} \${variantName ? \`(\${variantName})\` : ''}<br />
            <strong>SKU:</strong> ${sku}<br />
            <strong>Remaining Stock:</strong> <span style="font-size: 16px; font-weight: bold; color: \${isOutOfStock ? '#b91c1c' : '#c59b27'};">${currentStock}</span><br />
          </div>

          <p style="font-size: 13px; color: #555555;">Please reorder inventory soon to prevent checkout disruptions.</p>

          <div style="text-align: center; margin-top: 25px;">
            <a href="http://localhost:3000/admin/inventory" style="background-color: #111111; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 13px; font-weight: bold; text-transform: uppercase; border-radius: 4px; display: inline-block;">Manage Inventory</a>
          </div>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: adminEmail,
      subject: isOutOfStock ? `[CRITICAL] Out of Stock: SKU \${sku}` : `[WARNING] Low Stock Alert: SKU \${sku} (Qty: \${currentStock})`,
      html: template,
    });
  }

  async sendVerificationOtp(email: string, otp: string): Promise<void> {
    const template = this.getSignupOtpTemplate(otp);
    await this.sendEmail({
      to: email,
      subject: 'Verify Your Email - Brides Berry',
      html: template,
    });
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    const template = this.getPasswordResetTemplate(otp);
    await this.sendEmail({
      to: email,
      subject: 'Password Reset Request - Brides Berry',
      html: template,
    });
  }

  private getSignupOtpTemplate(otp: string): string {
    return `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">Brides Berry</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">Verify Your Email Address</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 25px;">Thank you for registering with Brides Berry. Please use the following 6-digit verification code to complete your registration. This code will expire in 15 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.2em; color: #c59b27; border: 1px solid #e8dbb4; padding: 10px 20px; background-color: #faf8f2; display: inline-block;">${otp}</span>
          </div>
          <p style="font-size: 12px; line-height: 1.6; color: #888888; margin-top: 30px; border-top: 1px solid #fafafa; padding-top: 20px;">If you did not request this verification code, please ignore this email.</p>
        </div>
      </div>
    `;
  }

  private getPasswordResetTemplate(otp: string): string {
    return `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">Brides Berry</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">Reset Your Password</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 25px;">We received a request to reset the password for your account. Please use the following 6-digit verification code to reset your password. This code will expire in 15 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.2em; color: #c59b27; border: 1px solid #e8dbb4; padding: 10px 20px; background-color: #faf8f2; display: inline-block;">${otp}</span>
          </div>
          <p style="font-size: 12px; line-height: 1.6; color: #888888; margin-top: 30px; border-top: 1px solid #fafafa; padding-top: 20px;">If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
      </div>
    `;
  }
}
