import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useGetUserOverviewQuery } from "@/lib/redux/api/overviewApi";
import { toast } from "sonner";
import {
  useBlockUserMutation,
  useVerifyBVNMutation,
  useVerifyUserMutation,
} from "@/lib/redux/api/authorizationApi";

const UserSeetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: userOverviewData, isLoading: isLoadingUsers } =
    useGetUserOverviewQuery();
  const [userManagement, setUserManagement] = useState({
    userId: "",
    blockReason: "",
    verificationNotes: "",
  });
  const [blockUser] = useBlockUserMutation();
  const [verifyUser] = useVerifyUserMutation();
  const [verifyBVN] = useVerifyBVNMutation();

  const handleBlockUser = async () => {
    if (!userManagement.userId) {
      toast.error("Please select a user first");
      return;
    }

    try {
      setIsLoading(true);
      await blockUser(userManagement.userId);
      toast.success("User blocked successfully!");
    } catch (error) {
      toast.error("Failed to block user");
      console.error("Failed to block user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyUser = async () => {
    if (!userManagement.userId) {
      toast.error("Please select a user first");
      return;
    }

    try {
      setIsLoading(true);
      await verifyUser(userManagement.userId);
      toast.success("User verified successfully!");
    } catch (error) {
      toast.error("Failed to verify user");
      console.error("Failed to verify user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBvnVerify = async () => {
    if (!userManagement.userId) {
      toast.error("Please select a user first");
      return;
    }

    try {
      setIsLoading(true);
      await verifyBVN(userManagement.userId);
      toast.success("BVN verification completed!");
    } catch (error) {
      toast.error("Failed to verify BVN");
      console.error("Failed to verify BVN:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
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
                disabled={isLoadingUsers}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {userOverviewData?.users.data.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.full_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
    </div>
  );
};

export default UserSeetings;
