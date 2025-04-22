import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, USER_VERIFIED_TEMPLATE } from "./emailTemplates.js";

import transporter from "../config/nodemailer.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  
  try {
    const mail = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Authenticator App & Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    };

    const response = await transporter.sendMail(mail);
  } catch (error) {
    throw new error(`Error sending verification: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response =  await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Authenticator App!",
      html: USER_VERIFIED_TEMPLATE.replace(
        "{name}",
        name
      ),
      category: "Email Verified"
    });
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {

  try {
    const response = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {

  try {
    const response = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
  } catch (error) {
    throw new Error(`Error sending password reset success email: ${error}`);
  }
}
