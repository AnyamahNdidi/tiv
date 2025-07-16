"use client";

import { useState } from "react";
import {
  Settings,
  Tag,
  Lock,
  Users,
  Shield,
  DollarSign,
  FileText,
  Plus,
  Copy,
  Check,
  Calendar,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useConfirmCouponCodeQuery,
} from "@/lib/redux/api/financeApi";
import PaginationControls from "@/components/PaginationControl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Mock data

export default function CouponsSettings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [couponFormData, setCouponFormData] = useState({
    original_amount: 0,
    discount_type: "percentage",
    expiration: 1,
    code_name: "",
    discount_amount: 0,
    percentage: 0,
  });

  // API hooks
  const { data: couponsApiData, isLoading } = useGetAllCouponsQuery({});
  const [createCoupon] = useCreateCouponMutation();
  const { data: confirmedCoupon, isLoading: isConfirming } =
    useConfirmCouponCodeQuery(confirmCode, { skip: !confirmCode.trim() });

  console.log("CouponApi", couponsApiData);

  const coupons = couponsApiData?.items || [];

  // Calculate paginated coupons
  const paginatedCoupons = coupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(coupons.length / itemsPerPage);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleConfirmCoupon = async () => {
    if (!confirmCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      if (confirmedCoupon) {
        if (confirmedCoupon.status === 500) {
          toast.error(confirmedCoupon.message || "Coupon has expired");
        } else {
          toast.success("Coupon is valid!");
          setConfirmModalOpen(false);
        }
      }
    } catch (error) {
      toast.error("Error verifying coupon");
      console.error("Coupon verification error:", error);
    } finally {
      setConfirmCode("");
    }
  };

  const formatDiscount = (type: string, amount: number) => {
    if (type === "percentage") {
      return `${amount}%`;
    }
    return `₦${amount}`;
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  const validateForm = () => {
    if (!couponFormData.code_name) {
      toast.error("Coupon name is required");
      return false;
    }
    if (couponFormData.original_amount <= 0) {
      toast.error("Original amount must be greater than 0");
      return false;
    }
    if (couponFormData.discount_amount <= 0) {
      toast.error("Discount amount must be greater than 0");
      return false;
    }
    if (couponFormData.expiration <= 0) {
      toast.error("Expiration days must be greater than 0");
      return false;
    }
    return true;
  };

  const handleCreateCoupon = async () => {
    if (!validateForm()) return;
    try {
      setIsCreating(true);
      await createCoupon({
        original_amount: Number(couponFormData.original_amount),
        discount_type: couponFormData.discount_type,
        expiration: Number(couponFormData.expiration),
        code_name: couponFormData.code_name,
        discount_amount: Number(couponFormData.discount_amount),
        percentage: Number(couponFormData.percentage),
      }).unwrap();
      toast.success("Coupon created successfully");
      setCreateModalOpen(false);
      // Reset form
      setCouponFormData({
        original_amount: 0,
        discount_type: "percentage",
        expiration: 1,
        code_name: "",
        discount_amount: 0,
        percentage: 0,
      });
    } catch (error) {
      toast.error("Failed to create coupon. Please try again.");
      console.error("Failed to create coupon:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Coupon Management</CardTitle>
              <CardDescription>
                Manage and monitor all coupon codes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog
                open={confirmModalOpen}
                onOpenChange={setConfirmModalOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">Confirm Coupon</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Coupon Code</DialogTitle>
                    <DialogDescription>
                      Enter the coupon code to verify its validity
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="confirm-code">Coupon Code</Label>
                      <Input
                        id="confirm-code"
                        placeholder="Enter coupon code to verify"
                        value={confirmCode}
                        onChange={(e) => setConfirmCode(e.target.value)}
                      />
                    </div>

                    {confirmedCoupon?.status === 500 && (
                      <div className="text-red-500 text-sm">
                        {confirmedCoupon.message}
                      </div>
                    )}

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={handleConfirmCoupon}
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <>
                          <span className="mr-2">Verifying...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Confirm Coupon"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Coupon
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Coupon</DialogTitle>
                    <DialogDescription>
                      Create a new coupon code with discount settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code-name">Coupon name</Label>
                        <Input
                          id="code-name"
                          value={couponFormData.code_name}
                          onChange={(e) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              code_name: e.target.value,
                            }))
                          }
                          placeholder="SAVE20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="original-amount">Original Amount</Label>
                        <Input
                          id="original-amount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={couponFormData.original_amount || ""}
                          onChange={(e) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              original_amount: e.target.value
                                ? parseFloat(e.target.value)
                                : 0,
                            }))
                          }
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={couponFormData.discount_type}
                          onValueChange={(value) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              discount_type: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                            <SelectItem value="flat_amount">
                              Fixed Amount
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration (days)</Label>
                        <Input
                          id="expiration"
                          type="number"
                          value={couponFormData.expiration}
                          onChange={(e) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              expiration: Number(e.target.value),
                            }))
                          }
                          placeholder="30"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discount-amount">Discount Amount</Label>
                        <Input
                          id="discount-amount"
                          type="number"
                          value={couponFormData.discount_amount || ""}
                          onChange={(e) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              discount_amount: e.target.value
                                ? parseFloat(e.target.value)
                                : 0,
                            }))
                          }
                          placeholder="10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="percentage">Percentage</Label>
                        <Input
                          id="percentage"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={couponFormData.percentage || ""}
                          onChange={(e) =>
                            setCouponFormData((prev) => ({
                              ...prev,
                              percentage: e.target.value
                                ? parseFloat(e.target.value)
                                : 0,
                            }))
                          }
                          placeholder="10"
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={handleCreateCoupon}
                    >
                      {isCreating ? (
                        <>
                          <span className="mr-2">Creating...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Create Coupon"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Coupons Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coupon Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCoupons.map((coupon: any) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-mono">
                        <div className="flex items-center gap-2">
                          <span>{coupon.coupon_code}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(coupon.coupon_code)}
                          >
                            {copiedCode === coupon.coupon_code ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDiscount(
                          coupon.discount_type,
                          coupon.discount_amounts
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {coupon.discount_type === "percentage" ? (
                            <Percent className="h-3 w-3" />
                          ) : (
                            <DollarSign className="h-3 w-3" />
                          )}
                          <span className="capitalize">
                            {coupon.discount_type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(
                            coupon.expiration_date
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            isExpired(coupon.expiration_date)
                              ? "destructive"
                              : "default"
                          }
                        >
                          {isExpired(coupon.expiration_date)
                            ? "Expired"
                            : "Active"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
