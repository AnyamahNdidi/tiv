"use client";

import { FC } from "react";

interface DeactivateModalProps {
  onClose: () => void;
}

const DeactivateModal: FC<DeactivateModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
        <div className="bg-gray-100 px-8 py-4 rounded-tr-xl rounded-tl-xl flex justify-between">
          <h2 className="text-md font-semibold">Deactivate profile</h2>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-8">
          <p className="text-lg text-gray-500">
            Are you sure you want to deactivate this profile? This means that
            they won’t be able to perform tasks until they are reactivated.
          </p>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#EB5E28] text-white py-3 rounded-lg text-sm font-medium"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
