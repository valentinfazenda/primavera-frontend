import SignInPageInner from "@/components/sign-in/sign-in.component";
import { Suspense } from "react";

export const revalidate = 0;

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SignInPageInner />
    </Suspense>
  );
};

export default SignInPage;
