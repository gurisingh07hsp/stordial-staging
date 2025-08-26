import { Suspense } from "react";
import ForgotPassword from "@/components/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword/>
    </Suspense>
  );
}