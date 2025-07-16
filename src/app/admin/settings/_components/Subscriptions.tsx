import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useListSubscriptionsQuery,
} from "@/lib/redux/api/subscriptionApi";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Subscriptions = () => {
  const [createSubscriptionModalOpen, setCreateSubscriptionModalOpen] =
    useState(false);
  const [editSubscriptionModalOpen, setEditSubscriptionModalOpen] =
    useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [subscriptionForm, setSubscriptionForm] = useState({
    title: "",
    description: "",
    verifications_provided: 0,
    price: "",
    discount: 0,
    is_active: true,
  });

  // Add RTK Query hooks
  const { data: subscriptions = [], isLoading } = useListSubscriptionsQuery({});
  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();
  const [deleteSubscription, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  // Update handlers
  const handleCreateSubscription = async () => {
    try {
      await createSubscription(subscriptionForm).unwrap();
      toast.success("Subscription created successfully");
      setCreateSubscriptionModalOpen(false);
      resetSubscriptionForm();
    } catch (error) {
      toast.error("Failed to create subscription");
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      await updateSubscription({
        subscription_id: selectedSubscription?.id as any,
        ...subscriptionForm,
      }).unwrap();
      toast.success("Subscription updated successfully");
      setEditSubscriptionModalOpen(false);
      resetSubscriptionForm();
    } catch (error) {
      toast.error("Failed to update subscription");
    }
  };

  const handleDeleteSubscription = async (id: any) => {
    try {
      await deleteSubscription(id).unwrap();
      toast.success("Subscription deleted successfully");
    } catch (error) {
      toast.error("Failed to delete subscription");
    }
  };

  const handleEditSubscription = (subscription: any) => {
    setSelectedSubscription(subscription);
    setSubscriptionForm(subscription);
    setEditSubscriptionModalOpen(true);
  };

  const resetSubscriptionForm = () => {
    setSubscriptionForm({
      title: "",
      description: "",
      verifications_provided: 0,
      price: "",
      discount: 0,
      is_active: true,
    });
    setSelectedSubscription(null);
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
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>
                Manage subscription plans and pricing
              </CardDescription>
            </div>
            <Dialog
              open={createSubscriptionModalOpen}
              onOpenChange={setCreateSubscriptionModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Subscription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Subscription</DialogTitle>
                  <DialogDescription>
                    Create a new subscription plan
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sub-title">Title</Label>
                    <Input
                      id="sub-title"
                      placeholder="Premium Plan"
                      value={subscriptionForm.title}
                      onChange={(e) =>
                        setSubscriptionForm({
                          ...subscriptionForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sub-description">Description</Label>
                    <Textarea
                      id="sub-description"
                      placeholder="Plan description"
                      value={subscriptionForm.description}
                      onChange={(e) =>
                        setSubscriptionForm({
                          ...subscriptionForm,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sub-verifications">
                        Verifications Provided
                      </Label>
                      <Input
                        id="sub-verifications"
                        type="number"
                        placeholder="100"
                        value={subscriptionForm.verifications_provided}
                        onChange={(e) =>
                          setSubscriptionForm({
                            ...subscriptionForm,
                            verifications_provided:
                              Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sub-price">Price</Label>
                      <Input
                        id="sub-price"
                        placeholder="29.99"
                        value={subscriptionForm.price}
                        onChange={(e) =>
                          setSubscriptionForm({
                            ...subscriptionForm,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sub-discount">Discount (%)</Label>
                      <Input
                        id="sub-discount"
                        type="number"
                        placeholder="10"
                        value={subscriptionForm.discount}
                        onChange={(e) =>
                          setSubscriptionForm({
                            ...subscriptionForm,
                            discount: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sub-active">Status</Label>
                      <Select
                        value={
                          subscriptionForm.is_active ? "active" : "inactive"
                        }
                        onValueChange={(value) =>
                          setSubscriptionForm({
                            ...subscriptionForm,
                            is_active: value === "active",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={handleCreateSubscription}
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Subscription"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Subscriptions Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Verifications</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No subscriptions found. Create your first subscription
                        plan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptions?.items?.map((subscription: any) => (
                      <TableRow key={subscription.id as any}>
                        <TableCell className="font-medium">
                          {subscription.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {subscription.description}
                        </TableCell>
                        <TableCell>
                          {subscription.verifications_provided}
                        </TableCell>
                        <TableCell>${subscription.price}</TableCell>
                        <TableCell>{subscription.discount}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscription.is_active ? "default" : "secondary"
                            }
                          >
                            {subscription.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleEditSubscription(subscription)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => {
                                handleDeleteSubscription(subscription.id);
                              }}
                              disabled={isDeleting}
                            >
                              {" "}
                              {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Subscription Modal */}
      <Dialog
        open={editSubscriptionModalOpen}
        onOpenChange={setEditSubscriptionModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Update subscription plan details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-sub-title">Title</Label>
              <Input
                id="edit-sub-title"
                placeholder="Premium Plan"
                value={subscriptionForm.title}
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sub-description">Description</Label>
              <Textarea
                id="edit-sub-description"
                placeholder="Plan description"
                value={subscriptionForm.description}
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    description: e.target.value,
                  })
                }
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-sub-verifications">
                  Verifications Provided
                </Label>
                <Input
                  id="edit-sub-verifications"
                  type="number"
                  placeholder="100"
                  value={subscriptionForm.verifications_provided}
                  onChange={(e) =>
                    setSubscriptionForm({
                      ...subscriptionForm,
                      verifications_provided:
                        Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sub-price">Price</Label>
                <Input
                  id="edit-sub-price"
                  placeholder="29.99"
                  value={subscriptionForm.price}
                  onChange={(e) =>
                    setSubscriptionForm({
                      ...subscriptionForm,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-sub-discount">Discount (%)</Label>
                <Input
                  id="edit-sub-discount"
                  type="number"
                  placeholder="10"
                  value={subscriptionForm.discount}
                  onChange={(e) =>
                    setSubscriptionForm({
                      ...subscriptionForm,
                      discount: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sub-active">Status</Label>
                <Select
                  value={subscriptionForm.is_active ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setSubscriptionForm({
                      ...subscriptionForm,
                      is_active: value === "active",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setEditSubscriptionModalOpen(false);
                  resetSubscriptionForm();
                }}
              >
                Cancel
              </Button> */}
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handleUpdateSubscription}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Subscription"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscriptions;
