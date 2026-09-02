import { Suspense } from "react";
import OTPVerifyContent from "./OTPVerifyContent";

export default function OTPVerify() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    Loading...
                </div>
            }
        >
            <OTPVerifyContent />
        </Suspense>
    );
}