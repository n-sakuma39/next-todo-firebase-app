import { useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icon } from "@/components/ui/icon";

const SocialLoginButtons = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGitHubSignIn = () => {
    setIsGitHubLoading(true);
    signIn("github", { callbackUrl: "/" });
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className={cn(buttonVariants({ variant: "outline" }), "py-6")}
        onClick={handleGitHubSignIn}
      >
        {isGitHubLoading ? (
          <Icon.spinner className="mr-2 animate-spin" />
        ) : (
          <Icon.github className="mr-2" />
        )}
        Github
      </button>
      <button
        className={cn(buttonVariants({ variant: "outline" }), "py-6")}
        onClick={handleGoogleSignIn}
      >
        {isGoogleLoading ? (
          <Icon.spinner className="mr-2 animate-spin" />
        ) : (
          <Icon.google className="mr-2" />
        )}
        Google
      </button>
    </div>
  );
};

export default SocialLoginButtons;
