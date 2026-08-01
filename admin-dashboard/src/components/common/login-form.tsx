"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

import { users } from "@/lib/users";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    setError("Invalid username or password.");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  // Redirect based on the user's dashboard
  router.push(user.dashboard);
}

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      {...props}
    >
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo/logo.jpg"
            alt="Shantiniketan Logo"
            width={200}
            height={200}
            priority
          />

          <div className="my-4 h-px w-full bg-border" />

          <h2 className="text-2xl font-bold text-red-600">
            Store Management System
          </h2>

          <p className="mt-2 text-center text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        {/* Username */}
        <div className="relative">
          <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="h-12 rounded-xl pl-12"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="h-12 rounded-xl pl-12 pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-red-600 text-lg hover:bg-red-700"
        >
          Login
        </Button>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-red-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Secure • Reliable • Efficient
        </p>
      </div>
    </form>
  );
}