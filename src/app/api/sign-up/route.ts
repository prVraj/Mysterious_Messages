import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect();

    try {

        const { userName, email, password } = await request.json()

        const existingUserAndVerifiedByUsername = await UserModel.findOne(
            {
                userName,
                isVerified:true
            }
        )

        if (existingUserAndVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User name already taken by someone else"
                },  { status: 400 }
            )
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor( 100000 + ( Math.random() * 900000 ) ).toString()
        
        if (existingUserByEmail) {

            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User exist with this email already"
                    }, {status:403})
            } else{

                const hashedPassword = await bcrypt.hash(password, 12)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date( Date.now() + 270000 )
                await existingUserByEmail.save()

            }
            
        } else{     // this else part for registering user

            // encrypting password
            const hashedPassword = await bcrypt.hash(password, 12)

            const expiryDate = new Date()
            expiryDate.setMinutes(expiryDate.getMinutes() + 45)

            const newUser = new UserModel({
                userName,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isMsgAccesspting: true,
                message: []
            })

            await newUser.save()          

        }

          // verify the email
          const emailResponse = await sendVerificationEmail(
            email,
            userName,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                }, {status:500}
            )
        }
        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            }, {status:202}
        )

    } catch (error) {
        console.error("Error in registring user: ", error);     // this is for backend handdel
        return Response.json(
            {
                success: false,
                message: "Error in registring user"             // this is for frontend showing
            },
            {
                status: 500
            }
        )
    }
}