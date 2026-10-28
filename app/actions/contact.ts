'use server';

import { Resend } from 'resend';
import { supabaseServerAdmin } from '@/lib/supabaseServer';

export interface ContactFormData {
  fullName: string;
  email: string;
  affiliation?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  deliveredVia?: 'resend' | 'database';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(data: ContactFormData): Promise<ContactActionResult> {
  try {
    // 1. Honeypot Anti-Spam Check
    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.warn('[Contact Action] Honeypot field triggered; rejecting bot submission.');
      return {
        success: false,
        error: 'Spam detection triggered. Please try again.',
      };
    }

    // 2. Defensive Input Sanitization & Trimming
    const fullName = (data.fullName || '').trim();
    const email = (data.email || '').trim().toLowerCase();
    const affiliation = (data.affiliation || '').trim();
    const subject = (data.subject || '').trim();
    const message = (data.message || '').trim();

    // 3. Validation Rules
    if (!fullName || fullName.length < 2) {
      return { success: false, error: 'Please enter a valid full name (minimum 2 characters).' };
    }
    if (fullName.length > 100) {
      return { success: false, error: 'Full name exceeds the 100 character limit.' };
    }

    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return { success: false, error: 'Please provide a valid, well-formed email address.' };
    }

    if (!subject || subject.length < 3) {
      return { success: false, error: 'Please provide a subject or project domain (minimum 3 characters).' };
    }
    if (subject.length > 200) {
      return { success: false, error: 'Subject exceeds the 200 character limit.' };
    }

    if (!message || message.length < 10) {
      return { success: false, error: 'Please enter a substantive message (minimum 10 characters).' };
    }
    if (message.length > 5000) {
      return { success: false, error: 'Message exceeds the 5,000 character limit.' };
    }

    const timestamp = new Date().toUTCString();
    const TARGET_RECIPIENT = 'donnevaliente@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    let emailDelivered = false;
    let resendErrorDetails = '';

    // 4. Primary Delivery: Resend Email Forwarding
    if (resendApiKey && resendApiKey.trim().length > 0) {
      try {
        const resend = new Resend(resendApiKey.trim());
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Academic Contact Gateway <onboarding@resend.dev>';

        const htmlEmail = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Academic &amp; Research Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070D1E; color: #F8FAFC; margin: 0; padding: 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0B132B; border: 1px solid #25616D; border-radius: 12px; overflow: hidden;">
    <tr>
      <td style="background: linear-gradient(135deg, #0B132B 0%, #1B998B 100%); padding: 24px 32px; border-bottom: 2px solid #1B998B;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
          Research Portfolio &amp; A2MD Inquiry
        </h1>
        <p style="margin: 6px 0 0 0; color: #E2E8F0; font-size: 13px;">
          Direct communication submitted via portfolio contact gateway
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 32px 16px 32px;">
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #94A3B8;">
          <tr>
            <td width="140" style="color: #1B998B; font-weight: 600;">Visitor Name:</td>
            <td style="color: #F8FAFC; font-weight: 500;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="color: #1B998B; font-weight: 600;">Reply-To Email:</td>
            <td><a href="mailto:${escapeHtml(email)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="color: #1B998B; font-weight: 600;">Affiliation:</td>
            <td style="color: #F8FAFC;">${escapeHtml(affiliation || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="color: #1B998B; font-weight: 600;">Domain / Subject:</td>
            <td style="color: #F8FAFC; font-weight: 600;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="color: #1B998B; font-weight: 600;">Timestamp (UTC):</td>
            <td style="color: #94A3B8;">${timestamp}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px;">
        <hr style="border: none; border-top: 1px solid #25616D; margin: 0;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 32px 32px 32px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1B998B; text-transform: uppercase; letter-spacing: 0.5px;">
          Message Content
        </h3>
        <div style="background-color: #070D1E; border: 1px solid #1E293B; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #060A18; padding: 16px 32px; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B; text-align: center;">
        Obed Tawiah Nyavor Academic &amp; A2MD Gateway • Target Recipient: ${TARGET_RECIPIENT}
      </td>
    </tr>
  </table>
</body>
</html>`;

        const { data: resendData, error: sendError } = await resend.emails.send({
          from: fromEmail,
          to: [TARGET_RECIPIENT],
          replyTo: email,
          subject: `[Academic Inquiry] ${subject} - ${fullName}`,
          html: htmlEmail,
        });

        if (sendError) {
          resendErrorDetails = sendError.message;
          console.warn('[Contact Action] Resend API returned error:', sendError);
        } else if (resendData?.id) {
          emailDelivered = true;
        }
      } catch (err: any) {
        resendErrorDetails = err?.message || 'Unknown Resend exception';
        console.warn('[Contact Action] Exception sending email via Resend:', err);
      }
    } else {
      resendErrorDetails = 'RESEND_API_KEY is not configured in server environment.';
    }

    // 5. Automatic Fallback & Archival: Store in Supabase 'contact_messages'
    let storedInDatabase = false;
    try {
      const { error: dbError } = await (supabaseServerAdmin.from('contact_messages') as any).insert({
        name: fullName,
        email: email,
        affiliation: affiliation || null,
        subject: subject,
        message: message,
      });

      if (!dbError) {
        storedInDatabase = true;
      } else {
        console.warn('[Contact Action] Supabase contact_messages fallback insert error:', dbError);
      }
    } catch (dbEx) {
      console.warn('[Contact Action] Exception during Supabase fallback insert:', dbEx);
    }

    // 6. Resolve Response Status
    if (emailDelivered) {
      return {
        success: true,
        message: 'Your inquiry has been successfully transmitted and forwarded to the researcher inbox.',
        deliveredVia: 'resend',
      };
    }

    if (storedInDatabase) {
      return {
        success: true,
        message: 'Your dispatch has been securely archived in the laboratory database and will be reviewed shortly.',
        deliveredVia: 'database',
      };
    }

    // If both mechanisms failed
    return {
      success: false,
      error: `Message delivery could not be completed. Details: ${resendErrorDetails || 'Database fallback offline'}. Please contact onyavol@lsu.edu directly.`,
    };
  } catch (outerErr: any) {
    console.error('[Contact Action] Fatal handler error:', outerErr);
    return {
      success: false,
      error: 'An unexpected server error occurred while processing your message. Please reach out to onyavol@lsu.edu.',
    };
  }
}
