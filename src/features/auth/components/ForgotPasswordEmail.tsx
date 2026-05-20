import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  userEmail: string;
  resetUrl: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { userEmail, resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Someone requested a password reset for your C Tech Learn account
                associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                If this was you, click the button below to reset your password.
                This link will expire in 1 hour for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white text-[16px] font-semibold py-[12px] px-[24px] rounded-[6px] no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="bg-amber-50 border-l-4 border-amber-400 p-[16px] rounded-[4px] mb-[24px]">
                <Text className="text-[14px] text-amber-800 leading-[20px] m-0 mb-[8px] font-semibold">
                  Security Notice
                </Text>
                <Text className="text-[14px] text-amber-700 leading-[20px] m-0">
                  If you didn&apos;t request this password reset, please ignore
                  this email. Your password will remain unchanged, and your
                  account is secure.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] m-0">
                If you're having trouble or didn&apos;t request this reset,
                please contact our support team immediately.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[14px] text-gray-500 leading-[20px] m-0 mb-[8px]">
                Best regards,
                <br />
                The C Tech Learn Security Team
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 mb-[16px]">
                This is an automated security email. Please do not reply to this
                message.
              </Text>

              {/* Company Footer */}
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 mb-[8px]">
                C Tech Learn, Inc.
                <br />
                123 Security Street, Suite 100
                <br />
                San Francisco, CA 94105
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                © 2026 C Tech Learn. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
