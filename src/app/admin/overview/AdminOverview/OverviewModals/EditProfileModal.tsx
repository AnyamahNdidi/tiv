
import { FC } from "react";

interface EditProfileModalProps {
  onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg relative">
        <div className="bg-gray-100 px-8 py-4 rounded-tr-xl rounded-tl-xl flex justify-between">
          <h2 className="text-md font-semibold">Edit profile information</h2>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Close Button */}

        <form className="space-y-4 p-8">
          <div className="grid grid-cols-2 gap-4 space-y-4">
            {/* First Name */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Occupancy Date */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="occupancy-date"
              >
                Occupancy Date
              </label>
              <input
                id="occupancy-date"
                type="date"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Renewal Date */}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="renewal-date"
              >
                Renewal Date
              </label>
              <input
                id="renewal-date"
                type="date"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

            {/* Selected Property (wider input) */}
            <div className="col-span-2 space-y-4">
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="selected-property"
              >
                Selected Property
              </label>
              <input
                id="selected-property"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
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

export default EditProfileModal;
