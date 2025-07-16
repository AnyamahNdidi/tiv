"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import rightImage from "../../../../public/rightloginimage.png";
import Logo from "../../../../public/Shape.png";
import Loader from "@/components/Loader";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/lib/redux/slices/authSlices";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth as any
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setIsLoadingLogin(true);
    try {
      const result = await dispatch(loginUser(data)).unwrap();

      if (result.isFirstLogin) {
        sessionStorage.setItem("temp_bear_token", result.bearToken as any);
        setShowFirstLoginModal(true);
        toast.info(
          "Default password detected. Please change your password for security.",
          {
            duration: 6000, // Show for 6 seconds
          }
        );
        return;
      }
      if (result.user) {
        toast.success("Login successful!");
        router.push("/admin");
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  useEffect(() => {
    if (pathname === "/overview") {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      <Dialog open={showFirstLoginModal} onOpenChange={setShowFirstLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Password Change Required</DialogTitle>
            <DialogDescription className="space-y-3 pt-3">
              <p className="text-black">
                Loging In for the first time detected. For your security, you
                need to change your default password before continuing.
              </p>
              <p className="text-black">
                You will be redirected to the password change page where you can
                set up your new password.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowFirstLoginModal(false);
                router.push("/change-password");
              }}
              className="px-4 py-2 rounded-md bg-[#EC5F34] text-white font-semibold hover:bg-[#e0502a] transition"
            >
              Continue to Password Change
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="min-h-screen flex">
        {/* Left panel */}
        <div className="w-full md:w-1/2 relative flex flex-col px-8 md:px-24 py-8">
          {/* Logo top-left */}
          <div className="absolute top-14 left-8 md:left-24 flex items-center space-x-2">
            <Image src={Logo} alt="Tivro Logo" width={24} height={24} />
            <span className="font-bold text-xl text-black">Tivro</span>
          </div>

          {/* Form */}
          <div className="flex-grow flex flex-col justify-center mt-12">
            <h2 className="text-2xl font-bold text-black mb-1">Admin Login</h2>
            <p className="text-sm text-gray-600 mb-6">
              Kindly enter your details to log in
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 w-full max-w-md"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-black font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`mt-1 w-full px-4 py-2 border rounded-md text-sm focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm text-black font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    className={`mt-1 w-full px-4 py-2 border rounded-md text-sm focus:outline-none ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-[#EC5F34]"
                  />

                  <span>Remember me</span>
                </label>
              </div>

              {serverError && (
                <p className="text-sm text-red-600 text-center">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoadingLogin}
                className="w-full py-2 rounded-md bg-[#EC5F34] text-white font-semibold hover:bg-[#e0502a] transition"
              >
                {isLoadingLogin ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right panel image */}
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
    </>
  );
};

export default AdminLogin;
