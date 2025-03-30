import SignInPageInner from "@/components/sign-in/sign-in.component";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SignInPageInner />
    </Suspense>
  );
};

export default SignInPage;
