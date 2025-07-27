import React from "react";
import { Button } from "@/components/ui/button";
import { useUnblockUserMutation } from "@/lib/redux/api/authorizationApi";
import { toast } from "sonner";

interface UnblockUserModalProps {
  onClose: () => void;
  userId: number;
}

const UnblockUserModal: React.FC<UnblockUserModalProps> = ({
  onClose,
  userId,
}) => {
  const [unblockUser, { isLoading }] = useUnblockUserMutation();

  const handleUnblock = async () => {
    try {
      await unblockUser(userId);
      toast.success("User unblocked successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to unblock user");
      console.error("Unblock error:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-md w-full bg-white rounded-xl">
      <h3 className="text-xl font-semibold">Unblock User</h3>
      <p className="text-gray-600">
        Are you sure you want to unblock this user? They will regain access to
        their account.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleUnblock}
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading ? "Unblocking..." : "Unblock User"}
        </Button>
      </div>
    </div>
  );
};

export default UnblockUserModal;
