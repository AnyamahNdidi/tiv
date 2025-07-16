import React from "react";
import { Icon } from "@iconify/react";
import { useBlockUserMutation } from "@/lib/redux/api/authorizationApi";
import { toast } from "sonner";

interface BlockUserModalProps {
  onClose: () => void;
  userId: number;
}

const BlockUserModal: React.FC<BlockUserModalProps> = ({ onClose, userId }) => {
  const [blockUser, { isLoading }] = useBlockUserMutation();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBlockUser = async () => {
    try {
      await blockUser(userId).unwrap();
      toast.success("User blocked successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to block user");
      console.error("Block user error:", error);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out"
    >
      <div className="bg-white rounded-lg w-full max-w-xl p-6 transform transition-all duration-300 ease-in-out animate-modal-slide">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Block User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to block this user? This action can be
            reversed later.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleBlockUser}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center gap-2"
            >
              {isLoading ? "Blocking..." : "Block User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;
