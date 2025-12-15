import { OtpModel, IOtp } from '../models/Otp.Models';
import { sendMail } from './email';
import { Types } from 'mongoose';

const OTP_LENGTH = 6;
const EXPIRY_MINUTES = 10;
const APP_NAME = 'Eavara';
const LOGO_URL = 'https://res.cloudinary.com/dhvkjanwa/image/upload/v1765820099/Gemini_Generated_Image_gts6x7gts6x7gts6_1_cpvbpv.png';

export async function generateAndSendOtp(email: string, userId?: Types.ObjectId) {
  // create code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + EXPIRY_MINUTES * 60000);

  // save OTP
  const otp = await OtpModel.create({ email, userId, code, expiresAt });

  // send email
  const html = generateOtpEmailTemplate(code);
  
  // for prod 
  if (process.env.ENVIRONMENT === "PROD") {
    await sendMail(email, `Your ${APP_NAME} Verification Code`, html).then(() => {
      // console.log('Email sent!');
    }).catch(console.error);
  } else {
    console.log(`Testing ${code} SEND TO ${email}`)
  }
  return otp;
}

export async function verifyOtp(email: string, code: string) {
  const otp = await OtpModel.findOne({ email, code, used: false });
  if (!otp) throw new Error('Invalid OTP');
  if (otp.expiresAt < new Date()) throw new Error('OTP expired');

  otp.used = true;
  await otp.save();

  return otp;
}

function generateOtpEmailTemplate(code: string): string {
  const characters = code.split('');
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your ${APP_NAME} Verification Code</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f7;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .logo-container {
            margin-bottom: 5px;
        }
        
        .logo {
            height: 100px;
            width: auto;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .app-name {
            color: white;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 10px;
        }
        
        .message {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .otp-container {
            margin: 40px 0;
            text-align: center;
        }
        
        .otp-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .otp-code {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .otp-digit {
            width: 60px;
            height: 70px;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 700;
            color: #333;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .otp-digit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            border-color: #667eea;
        }
        
        .expiry-notice {
            background-color: #fff9e6;
            border-left: 4px solid #ffc107;
            padding: 15px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .expiry-title {
            color: #d97706;
            font-weight: 600;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .expiry-text {
            color: #92400e;
            font-size: 14px;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #888;
            font-size: 14px;
        }
        
        .support {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 20px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }
        
        @media (max-width: 480px) {
            .content {
                padding: 30px 20px;
            }
            
            .otp-digit {
                width: 50px;
                height: 60px;
                font-size: 28px;
            }
            
            .greeting {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-container">
                <img src="${LOGO_URL}" alt="${APP_NAME} Logo" class="logo">
            </div>
            <div class="app-name">${APP_NAME}</div>
        </div>
        
        <div class="content">
            <h1 class="greeting">Verification Required</h1>
            <p class="message">
                You're one step away! Use the verification code below to complete your action on ${APP_NAME}. 
                This code will expire in ${EXPIRY_MINUTES} minutes for security reasons.
            </p>
            
            <div class="otp-container">
                <div class="otp-title">Your Verification Code</div>
               
                <div class="code-text" style="font-size: 20px; font-weight: 600; color: #333; margin: 15px 0;">
                    ${code}
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 10px;">
                    Enter this code on the verification page
                </p>
            </div>
            
            <div class="expiry-notice">
                <div class="expiry-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Code Expiry Notice
                </div>
                <p class="expiry-text">
                    This code is valid for ${EXPIRY_MINUTES} minutes only. Do not share this code with anyone.
                </p>
            </div>
            
           
            <div class="footer">
                <p>If you didn't request this code, please ignore this email or contact support.</p>
                <div class="support">
                    Need help? Contact our support team at support@eavara.com
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}