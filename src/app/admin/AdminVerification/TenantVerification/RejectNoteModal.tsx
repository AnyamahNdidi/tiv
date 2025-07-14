import { FC, useState } from "react";

interface RejectionNoteModalProps {
  onClose: () => void;
  
}

const RejectionNoteModal: FC<RejectionNoteModalProps> = ({
  onClose,
}) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800">
            Rejection Note
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="rejection-note"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Why is this tenant&apos;s inspection being rejected?
            </label>
            <textarea
              id="rejection-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none"
              rows={5}
              placeholder="Type your reason here..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-[#EC5F34] text-white rounded-md hover:bg-rose-600"
            >
              Submit Reason
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectionNoteModal;
