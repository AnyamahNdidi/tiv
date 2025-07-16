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

const UserSeetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userManagement, setUserManagement] = useState({
    userId: "",
    blockReason: "",
    verificationNotes: "",
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
