"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import rightImage from "../../../public/rightloginimage.png";
import Logo from "../../../public/Shape.png";
import { changePasswordFirsUser } from "@/lib/redux/slices/authSlices";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const bearToken = Cookies.get("bear_token");
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (!bearToken) {
      router.push("/");
    }
  }, [router, bearToken]);

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const result = await dispatch(changePasswordFirsUser(data)).unwrap();

      if (result) {
        Cookies.remove("bear_token");
        toast.success("Password changed successfully");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 relative flex flex-col px-8 md:px-24">
        {/* Logo section */}
        <div className="absolute top-8 left-8 md:left-24 flex items-center space-x-2">
          <Image src={Logo} alt="Tivro Logo" width={24} height={24} />
          <span className="font-bold text-xl text-black">Tivro</span>
        </div>

        {/* Main content - centered */}
        <div className="flex-grow flex flex-col justify-center min-h-screen">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Change Default Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please set a new password for your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="text-sm text-black font-medium"
                  >
                    Current Password
                  </label>
                  <input
                    {...register("oldPassword")}
                    type="password"
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EC5F34] focus:border-[#EC5F34] focus:z-10 sm:text-sm"
                    placeholder="Enter current password"
                  />
                  {errors.oldPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="text-sm text-black font-medium"
                  >
                    New Password
                  </label>
                  <input
                    {...register("newPassword")}
                    type="password"
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EC5F34] focus:border-[#EC5F34] focus:z-10 sm:text-sm"
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="text-sm text-black font-medium"
                  >
                    Confirm New Password
                  </label>
                  <input
                    {...register("confirmNewPassword")}
                    type="password"
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#EC5F34] focus:border-[#EC5F34] focus:z-10 sm:text-sm"
                    placeholder="Confirm new password"
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#EC5F34] hover:bg-[#e0502a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EC5F34]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Changing Password...</span>
                  </div>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src={rightImage}
          alt="Handshake"
          layout="fill"
          objectFit="cover"
          className="rounded-l-none"
        />
      </div>
    </div>
  );
}
