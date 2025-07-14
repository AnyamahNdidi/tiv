
import { FC } from "react";

interface AssignToAgentModalProps {
  onClose: () => void;
}

const AssignToAgentModal: FC<AssignToAgentModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
        <div className="bg-gray-100 px-8 py-4 rounded-tr-xl rounded-tl-xl flex justify-between">
          <h2 className="text-md font-semibold">Assign this inspection to agent</h2>
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


            {/* Security features*/}
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="select-agent"
              >
                Select agent
              </label>
              <input
                id="security-features"
                type="text"
                className="border rounded-xl border-gray-200 p-2 w-full"
              />
            </div>

        
            <div>
              <label
                className="block mb-2 font-medium text-gray-600 text-sm"
                htmlFor="assign-a-role"
              >
                Assign a role
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
              Assign to Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignToAgentModal;
