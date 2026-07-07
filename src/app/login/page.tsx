import Image from "next/image";
import { LoginForm } from "@/components/common/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="grid min-h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-2">
        {/* Left Section - Hidden on Mobile */}
        <div className="hidden items-center justify-center border-r border-gray-200 bg-white p-8 lg:flex">
          <div className="relative h-[85vh] w-full max-w-3xl">
            <Image
              src="/logo/bagroung_login.png"
              alt="Shantiniketan Store Management System"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center bg-white p-6 sm:p-8">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}