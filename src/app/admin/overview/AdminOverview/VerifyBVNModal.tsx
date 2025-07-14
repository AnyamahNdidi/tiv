import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface VerifyBVNModalProps {
  onClose: () => void;
  userId: number;
}

const VerifyBVNModal: React.FC<VerifyBVNModalProps> = ({ onClose, userId }) => {
  const [bvnNumber, setBvnNumber] = useState("");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out"
    >
      <div className="bg-white rounded-lg w-full max-w-xl p-6 transform transition-all duration-300 ease-in-out animate-modal-slide">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Verify BVN</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BVN Number
            </label>
            <input
              type="text"
              value={bvnNumber}
              onChange={(e) => setBvnNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter BVN number"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Add BVN verification logic here
                onClose();
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              Verify BVN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyBVNModal;
