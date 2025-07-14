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
              <DollarSign className="w-4 h-4" />
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
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">Select User</Label>
                    <Select
                      value={userManagement.userId}
                      onValueChange={(value) =>
                        setUserManagement({ ...userManagement, userId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">John Doe (ID: 1)</SelectItem>
                        <SelectItem value="2">Jane Smith (ID: 2)</SelectItem>
                        <SelectItem value="3">Mike Johnson (ID: 3)</SelectItem>
                        <SelectItem value="4">Sarah Wilson (ID: 4)</SelectItem>
                        <SelectItem value="5">David Brown (ID: 5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockReason">Block Reason (Optional)</Label>
                    <Input
                      id="blockReason"
                      placeholder="Reason for blocking"
                      value={userManagement.blockReason}
                      onChange={(e) =>
                        setUserManagement({
                          ...userManagement,
                          blockReason: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verificationNotes">
                      Verification Notes
                    </Label>
                    <Input
                      id="verificationNotes"
                      placeholder="Verification notes"
                      value={userManagement.verificationNotes}
                      onChange={(e) =>
                        setUserManagement({
                          ...userManagement,
                          verificationNotes: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleBlockUser}
                    disabled={isLoading}
                    variant="destructive"
                  >
                    Block User
                  </Button>
                  <Button
                    onClick={handleVerifyUser}
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Verify User
                  </Button>
                  <Button
                    onClick={handleBvnVerify}
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    BVN Verify User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assign Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roleId">Role ID</Label>
                    <Input
                      id="roleId"
                      placeholder="Enter role ID"
                      value={permissionData.role_id}
                      onChange={(e) =>
                        setPermissionData({
                          ...permissionData,
                          role_id: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sectionId">Section ID</Label>
                    <Input
                      id="sectionId"
                      placeholder="Enter section ID"
                      value={permissionData.section_id}
                      onChange={(e) =>
                        setPermissionData({
                          ...permissionData,
                          section_id: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="can_view"
                        checked={permissionData.can_view}
                        onChange={(e) =>
                          setPermissionData({
                            ...permissionData,
                            can_view: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <Label htmlFor="can_view" className="text-sm">
                        CAN VIEW
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="can_edit"
                        checked={permissionData.can_edit}
                        onChange={(e) =>
                          setPermissionData({
                            ...permissionData,
                            can_edit: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <Label htmlFor="can_edit" className="text-sm">
                        CAN EDIT
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="can_hide"
                        checked={permissionData.can_hide}
                        onChange={(e) =>
                          setPermissionData({
                            ...permissionData,
                            can_hide: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <Label htmlFor="can_hide" className="text-sm">
                        CAN HIDE
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAssignPermissions}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Assigning..." : "Assign Permissions"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Coupon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <Input
                        id="couponCode"
                        placeholder="SAVE20"
                        value={couponData.code}
                        onChange={(e) =>
                          setCouponData({ ...couponData, code: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount">Discount</Label>
                      <Input
                        id="discount"
                        placeholder="20"
                        value={couponData.discount}
                        onChange={(e) =>
                          setCouponData({
                            ...couponData,
                            discount: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={couponData.type}
                        onValueChange={(value) =>
                          setCouponData({ ...couponData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input
                        id="usageLimit"
                        placeholder="100"
                        value={couponData.usageLimit}
                        onChange={(e) =>
                          setCouponData({
                            ...couponData,
                            usageLimit: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={couponData.expiryDate}
                      onChange={(e) =>
                        setCouponData({
                          ...couponData,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Coupon description"
                      value={couponData.description}
                      onChange={(e: any) =>
                        setCouponData({
                          ...couponData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleCreateCoupon}
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? "Creating..." : "Create Coupon"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confirm Coupon Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirmCode">Coupon Code</Label>
                    <Input
                      id="confirmCode"
                      placeholder="Enter coupon code to verify"
                      value={couponData.confirmCode}
                      onChange={(e) =>
                        setCouponData({
                          ...couponData,
                          confirmCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleConfirmCoupon}
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? "Confirming..." : "Confirm Coupon"}
                  </Button>
                </CardContent>
              </Card>
            </div>
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
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionName">Subscription Name</Label>
                    <Input
                      id="subscriptionName"
                      placeholder="Premium Plan"
                      value={subscriptionData.name}
                      onChange={(e) =>
                        setSubscriptionData({
                          ...subscriptionData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionPrice">Price</Label>
                    <Input
                      id="subscriptionPrice"
                      placeholder="29.99"
                      value={subscriptionData.price}
                      onChange={(e) =>
                        setSubscriptionData({
                          ...subscriptionData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      placeholder="30"
                      value={subscriptionData.duration}
                      onChange={(e) =>
                        setSubscriptionData({
                          ...subscriptionData,
                          duration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionId">
                      Subscription ID (for updates)
                    </Label>
                    <Input
                      id="subscriptionId"
                      placeholder="Enter ID to update/delete"
                      value={subscriptionData.subscriptionId}
                      onChange={(e) =>
                        setSubscriptionData({
                          ...subscriptionData,
                          subscriptionId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Features</Label>
                  <Textarea
                    id="features"
                    placeholder="List subscription features"
                    value={subscriptionData.features}
                    onChange={(e: any) =>
                      setSubscriptionData({
                        ...subscriptionData,
                        features: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleCreateSubscription}
                    disabled={isLoading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? "Creating..." : "Create Subscription"}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    className="flex-1 bg-transparent"
                  >
                    Update Subscription
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Delete Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
