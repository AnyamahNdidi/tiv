"use client";

import { useState } from "react";
import {
  Settings,
  Lock,
  Users,
  Shield,
  Tag,
  DollarSign,
  CreditCard,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import PasswordSettings from "./_components/PasswordSettings";
import CouponsSettings from "./_components/CouponsSettings";
import { PermissionSettings } from "./_components/PermissionSettings";
import UserSeetings from "./_components/UserSeetings";
import Subscriptions from "./_components/Subscriptions";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Password Management State

  // User Management State
  const [userManagement, setUserManagement] = useState({
    userId: "",
    blockReason: "",
    verificationNotes: "",
  });

  // Permissions State
  const [permissionData, setPermissionData] = useState({
    role_id: "",
    section_id: "",
    can_view: false,
    can_edit: false,
    can_hide: false,
  });

  // Coupon Management State
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expiryDate: "",
    usageLimit: "",
    description: "",
    confirmCode: "",
  });

  // Pricing State
  const [pricingData, setPricingData] = useState({
    serviceCharge: "",
    bonusCharge: "",
    inspectionCharge: "",
  });

  // Subscription State
  const [subscriptionData, setSubscriptionData] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    subscriptionId: "",
  });

  const handleBlockUser = async () => {
    setIsLoading(true);
    console.log("Blocking user:", userManagement.userId);
    // API call to /admin/api/v1/block/{user_id}/
    setTimeout(() => {
      setIsLoading(false);
      alert("User blocked successfully!");
    }, 1000);
  };

  const handleVerifyUser = async () => {
    setIsLoading(true);
    console.log("Verifying user:", userManagement.userId);
    // API call to /admin/api/v1/verify_user/{user_id}/
    setTimeout(() => {
      setIsLoading(false);
      alert("User verified successfully!");
    }, 1000);
  };

  const handleBvnVerify = async () => {
    setIsLoading(true);
    console.log("BVN verifying user:", userManagement.userId);
    // API call to /admin/api/v1/bvn_verified/{user_id}/
    setTimeout(() => {
      setIsLoading(false);
      alert("BVN verification completed!");
    }, 1000);
  };

  const handleAssignPermissions = async () => {
    setIsLoading(true);
    console.log("Assigning permissions:", permissionData);
    // API call to /admin/api/v1/assign/permissions/
    setTimeout(() => {
      setIsLoading(false);
      alert("Permissions assigned successfully!");
    }, 1000);
  };

  const handleCreateCoupon = async () => {
    setIsLoading(true);
    console.log("Creating coupon:", couponData);
    // API call to /admin/api/v1/create/coupon/
    setTimeout(() => {
      setIsLoading(false);
      alert("Coupon created successfully!");
    }, 1000);
  };

  const handleConfirmCoupon = async () => {
    setIsLoading(true);
    console.log("Confirming coupon code:", couponData.confirmCode);
    // API call to /admin/api/v1/confirm/coupon/code/
    setTimeout(() => {
      setIsLoading(false);
      alert("Coupon code confirmed!");
    }, 1000);
  };

  const handleUpdatePricing = async () => {
    setIsLoading(true);
    console.log("Updating pricing:", pricingData);
    // API calls to service/charge, bonus/charge, inspection/charge endpoints
    setTimeout(() => {
      setIsLoading(false);
      alert("Pricing updated successfully!");
    }, 1000);
  };

  const handleCreateSubscription = async () => {
    setIsLoading(true);
    console.log("Creating subscription:", subscriptionData);
    // API call to /admin/api/v1/create/subscription
    setTimeout(() => {
      setIsLoading(false);
      alert("Subscription created successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Settings className="w-8 h-8 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <p className="text-gray-600">
              Manage system settings and configurations
            </p>
          </div>
        </div>

        <Tabs defaultValue="coupons" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              {/* <DollarSign className="w-4 h-4" /> */}
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Subscriptions
            </TabsTrigger>
          </TabsList>

          {/* Password Management Tab */}
          <TabsContent value="password" className="space-y-6">
            <PasswordSettings />
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <UserSeetings />
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <PermissionSettings />
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-6">
            <CouponsSettings />
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceAmount">Service Charge Amount</Label>
                    <Input
                      id="serviceAmount"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={pricingData.serviceCharge}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          serviceCharge: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bonusAmount">Bonus Charge Amount</Label>
                    <Input
                      id="bonusAmount"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={pricingData.bonusCharge}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          bonusCharge: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspectionAmount">
                      Inspection Charge Amount
                    </Label>
                    <Input
                      id="inspectionAmount"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={pricingData.inspectionCharge}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          inspectionCharge: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleUpdatePricing}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Pricing"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <Subscriptions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
