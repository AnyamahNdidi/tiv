"use client";

import { FC } from "react";

interface EditProfileModalProps {
  onClose: () => void;
}

const EditPropertyModal: FC<EditProfileModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
        <div className="bg-gray-100 px-8 py-4 rounded-tr-xl rounded-tl-xl flex justify-between">
          <h2 className="text-md font-semibold">Edit property details</h2>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Close Button */}

        <form className="space-y-2 p-6">
          <div className="flex flex-col justify-center gap-4 space-y-1">
            {/* Property Name */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-800 text-sm"
                htmlFor="property-name"
              >
                Property name
              </label>
              <input
                id="property-name"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Property Location */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="property-location"
              >
                Property location
              </label>
              <input
                id="property-location"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Property type */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="property-type"
              >
                Property type
              </label>
              <input
                id="property-type"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Maintenance options */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="maintenance-options"
              >
                Maintenance options
              </label>
              <input
                id="maintenance-options"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Lease terms */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="lease-terms"
              >
                Lease terms
              </label>
              <input
                id="lease-terms"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Security features*/}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="security-features"
              >
                Security features
              </label>
              <input
                id="security-features"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Property description */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="property-description"
              >
                Property description (Optional)
              </label>
              <input
                id="property-description"
                type="text"
                className="text-start h-[90px] border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#EB5E28] text-white py-3 rounded-lg text-sm font-medium"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyModal;
