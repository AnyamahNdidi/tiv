// src/components/Signup/SignupForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { signupSchema, SignupFormValues } from "./SignupSchema";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setServerError("");

    try {
      const res = await fetch("/admin/api/v1/admin/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Signup failed");

      router.push("/admin");
    } catch {
      setServerError("Failed to create admin. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full max-w-md"
        noValidate
      >
        <div>
          <label
            htmlFor="first_name"
            className="text-sm font-medium text-black"
          >
            First Name
          </label>
          <input
            {...register("first_name")}
            id="first_name"
            type="text"
            placeholder="Enter first name"
            className={`mt-1 w-full px-4 py-2 border rounded-md text-sm ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.first_name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className="text-sm font-medium text-black">
            Last Name
          </label>
          <input
            {...register("last_name")}
            id="last_name"
            type="text"
            placeholder="Enter last name"
            className={`mt-1 w-full px-4 py-2 border rounded-md text-sm ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.last_name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-black">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter email address"
            className={`mt-1 w-full px-4 py-2 border rounded-md text-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="text-sm font-medium text-black">
            Role
          </label>
          <input
            {...register("role")}
            id="role"
            type="text"
            placeholder="Enter role (e.g. admin)"
            className={`mt-1 w-full px-4 py-2 border rounded-md text-sm ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.role && (
            <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-sm text-red-600 text-center">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-[#EC5F34] text-white font-semibold hover:bg-[#e0502a] transition"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
