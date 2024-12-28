import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

interface EmailOptions {
    username: string;
    email: string;
    emailType: "VERIFY" | "CONFIRM" | "RESET";
    userID: string;
    token?: string;
}

export const sendEmail = async ({username, email, emailType, userID, token }: EmailOptions) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS,
            },
        });

        const mailOptions = {
            from: 'thirdeye4123@gmail.com', 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Confirmation Mail",
            text: "Hello world?",
            html: (() => {
                switch (emailType) {
                    case "VERIFY":
                        return `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        color: #333333;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        background-color: #ffffff;
                                        max-width: 600px;
                                        margin: 20px auto;
                                        padding: 20px;
                                        border-radius: 8px;
                                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        text-align: center;
                                        background-color: #007BFF;
                                        color: #ffffff;
                                        padding: 10px 0;
                                        border-radius: 8px 8px 0 0;
                                    }
                                    .header h1 {
                                        margin: 0;
                                        font-size: 24px;
                                    }
                                    .content {
                                        padding: 20px;
                                        line-height: 1.6;
                                    }
                                    .cta-button {
                                        display: inline-block;
                                        background-color: #007BFF;
                                        color: #ffffff;
                                        padding: 10px 20px;
                                        text-decoration: none;
                                        border-radius: 5px;
                                        font-weight: bold;
                                        margin-top: 20px;
                                    }
                                    .cta-button:hover {
                                        background-color: #0056b3;
                                    }
                                    .footer {
                                        text-align: center;
                                        margin-top: 20px;
                                        font-size: 12px;
                                        color: #777777;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="header">
                                        <h1>Verify Your Email</h1>
                                    </div>
                                    <div class="content">
                                        <p>Hello, ${username}</p>
                                        <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
                                        <p style="text-align: center;">
                                            <a href="${process.env.DOMAIN}/verifyemail?token=${token}" class="cta-button">Verify Email</a>
                                        </p>
                                        <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
                                        <p><a href="${process.env.DOMAIN}/verifyemail?token=${token}">${process.env.DOMAIN}/verifyemail?token=${token}</a></p>
                                    </div>
                                    <div class="footer">
                                        <p>If you did not request this email, you can safely ignore it.</p>
                                        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>
                            `;
                    case "RESET":
                        return `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        color: #333333;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        background-color: #ffffff;
                                        max-width: 600px;
                                        margin: 20px auto;
                                        padding: 20px;
                                        border-radius: 8px;
                                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        text-align: center;
                                        background-color: #4caf50;
                                        color: #ffffff;
                                        padding: 10px 0;
                                        border-radius: 8px 8px 0 0;
                                    }
                                    .header h1 {
                                        margin: 0;
                                        font-size: 24px;
                                    }
                                    .content {
                                        padding: 20px;
                                        line-height: 1.6;
                                    }
                                    .cta-button {
                                        display: inline-block;
                                        background-color: #4caf50;
                                        color: #ffffff;
                                        padding: 10px 20px;
                                        text-decoration: none;
                                        border-radius: 5px;
                                        font-weight: bold;
                                        margin-top: 20px;
                                    }
                                    .cta-button:hover {
                                        background-color: #388e3c;
                                    }
                                    .footer {
                                        text-align: center;
                                        margin-top: 20px;
                                        font-size: 12px;
                                        color: #777777;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="header">
                                        <h1>Verify Your Email</h1>
                                    </div>
                                    <div class="content">
                                        <p>Hello,</p>
                                        <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
                                        <p style="text-align: center;">
                                            <a href="${process.env.DOMAIN}/verifyemail?token=${token}" class="cta-button">Verify Email</a>
                                        </p>
                                        <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
                                        <p><a href="${process.env.DOMAIN}/verifyemail?token=${token}">${process.env.DOMAIN}/verifyemail?token=${token}</a></p>
                                    </div>
                                    <div class="footer">
                                        <p>If you did not request this email, you can safely ignore it.</p>
                                        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>
                            `;
                    default:
                        return `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                /* Same styling as above */
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="header" style="background-color: #2196F3;">
                                    <h1>Email Successfully Verified</h1>
                                </div>
                                <div class="content">
                                    <p>Hello, ${username}</p>
                                    <p>Congratulations! Your email address has been successfully verified.</p>
                                    <p>You can now enjoy the full features of our platform.</p>
                                </div>
                                <div class="footer">
                                    <p>If you did not request this email, please contact our support team.</p>
                                    <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        `;
                }
            })(),            
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
