import { OAuthComp } from "./OAuthComp";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { useOAuthSignIn } from "@/features/auth/lib/use-oauth-signin";

export function OAuthButtons() {
  const { googlePending, githubPending, signInGoogle, signInGithub } =
    useOAuthSignIn();

  return (
    <div className="grid grid-cols-2 gap-4">
      <OAuthComp
        provider="google"
        icon={googlePending ? <Spinner className="size-5" /> : <FcGoogle />}
        onClick={() => signInGoogle()}
        disabled={googlePending}
      />
      <OAuthComp
        provider="github"
        icon={githubPending ? <Spinner className="size-5" /> : <FaGithub />}
        onClick={() => signInGithub()}
        disabled={githubPending}
      />
    </div>
  );
}
