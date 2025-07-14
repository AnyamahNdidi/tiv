"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword, resetPassword } from "@/lib/redux/slices/authSlices";
import { toast } from "sonner";
import { AppDispatch } from "@/lib/redux/store";

const PasswordSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "", // Changed from currentPassword to oldPassword
    newPassword: "",
    confirmNewPassword: "", // Changed from confirmPassword to confirmNewPassword
    resetEmail: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "", // Changed from currentPassword to oldPassword
    newPassword: "",
    confirmNewPassword: "", // Changed from confirmPassword to confirmNewPassword
    resetEmail: "",
  });

  const validateChangePassword = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      resetEmail: "",
    };
    let isValid = true;

    if (!passwordData.oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required";
      isValid = false;
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!passwordData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateResetPassword = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      resetEmail: "",
    };
    let isValid = true;

    if (!passwordData.resetEmail.trim()) {
      newErrors.resetEmail = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passwordData.resetEmail)) {
      newErrors.resetEmail = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors as any);
    return isValid;
  };

  const handlePasswordChange = async () => {
    if (!validateChangePassword()) return;

    try {
      setIsLoadingChange(true);
      const result = await dispatch(
        changePassword({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        })
      ).unwrap();

      toast.success("Password changed successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        resetEmail: passwordData.resetEmail,
      });
      setErrors({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        resetEmail: "",
      });
    } catch (error: any) {
      toast.error(error || "Failed to change password");
    } finally {
      setIsLoadingChange(false);
    }
  };
  const handlePasswordReset = async () => {
    if (!validateResetPassword()) return;

    try {
      setIsLoading(true);
      const result = await dispatch(
        resetPassword(passwordData.resetEmail)
      ).unwrap();

      toast.success("Password reset email sent!");
      setPasswordData({
        ...passwordData,
        resetEmail: "",
      });
      setErrors({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        resetEmail: "",
      });
    } catch (error: any) {
      toast.error(error || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showPassword ? "text" : "password"}
                required
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            {errors.oldPassword && (
              <p className="text-sm text-red-500">{errors.oldPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                required
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              required
              value={passwordData.confirmNewPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmNewPassword: e.target.value,
                })
              }
            />
            {errors.confirmNewPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
          <Button
            onClick={handlePasswordChange}
            disabled={isLoadingChange}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoadingChange ? "Changing..." : "Change Password"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reset User Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resetEmail">User Email</Label>
            <Input
              id="resetEmail"
              type="email"
              placeholder="user@example.com"
              value={passwordData.resetEmail}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  resetEmail: e.target.value,
                })
              }
            />
            {errors.resetEmail && (
              <p className="text-sm text-red-500">{errors.resetEmail}</p>
            )}
          </div>
          <Button
            onClick={handlePasswordReset}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordSettings;
