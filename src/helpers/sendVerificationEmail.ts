import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VarificationEmail";
import { ApiResponse } from "@/utils/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    userName: string,
    verificationCode: string        // OTP
): Promise<ApiResponse>{

    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous Messages | Verification email',
            react: VerificationEmail({username: userName, otp: verificationCode}),
          });

          return {
            success: true,
            message: "Successfully sended verification email"
          }
        
    } catch (sendEmailError) {
        console.error("Error while sending varify email: ", sendEmailError);
        return {
            success: false,
            message: "Failed to send verify email"
        }
    }
}
