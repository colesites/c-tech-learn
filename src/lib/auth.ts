import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import EmailVerification from "@/features/auth/components/EmailVerification";
import ForgotPasswordEmail from "@/features/auth/components/ForgotPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "C Tech Learn <verify@c-technology-inc.com>",
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({ userEmail: user.email, resetUrl: url }),
      });
    },
  },
  baseURL: process.env.BETTER_AUTH_URL as string,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "C Tech Learn <verify@c-technology-inc.com>",
        to: user.email,
        subject: "Verify your email address",
        react: EmailVerification({ username: user.name, verificationUrl: url }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hours
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
