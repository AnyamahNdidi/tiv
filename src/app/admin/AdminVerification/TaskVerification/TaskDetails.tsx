import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TaskData } from "./TaskDataType";
import { useGetUploadedDocumentsQuery } from "@/lib/redux/api/verificationApi";
import ModalWrapper from "@/components/ModalWrapper";
import { useUpdateWorkplaceStatusMutation } from "@/lib/redux/api/verificationApi";
import { toast } from "sonner";

interface TaskDetailsProps {
  request: TaskData;
  onClose: () => void;
}

const statusColors: any = {
  Pending: "bg-yellow-100 text-yellow-600",
  Ongoing: "bg-blue-100 text-blue-600",
  Failed: "bg-red-100 text-red-600",
  Passed: "bg-green-100 text-green-600",
};

const documentIcons: any = {
  identity_document: "mdi:card-account-details",
  employment_letter: "mdi:file-document-edit",
  default: "mdi:file-document",
};

const getFileType = (url: string) => {
  if (url.toLowerCase().endsWith(".pdf")) return "PDF";
  if (url.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) return "Image";
  return "Document";
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ request, onClose }) => {
  const [openSections, setOpenSections] = useState({
    identityCheck: false,
    creditCheck: false,
    employmentCheck: false,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { id } = request;
  const [activeAction, setActiveAction] = useState<
    "approved" | "reject" | null
  >(null);
  const [updateStatus, { isLoading: isloadingSatatue }] =
    useUpdateWorkplaceStatusMutation();

  const {
    data: uploadedDocuments,
    isLoading,
    error,
  } = useGetUploadedDocumentsQuery(id);

  const handleStatusUpdate = async (action: "approved" | "reject") => {
    setActiveAction(action);
    const toastId = toast.loading(`Updating status to ${action}...`);

    try {
      await updateStatus({
        id: request.id,
        action,
      }).unwrap();

      toast.success(`Status updated to ${action} successfully!`, {
        id: toastId,
      });
      onClose(); // Return to list view
    } catch (error) {
      toast.error("Failed to update status", {
        id: toastId,
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setActiveAction(null);
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <button
            onClick={onClose}
            className="text-sm sm:text-md text-gray-600 font-semibold"
            aria-label="Go back"
          >
            ←
          </button>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Verification Request
              </h2>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  statusColors[request.status]
                }`}
              >
                {request.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Created at {request.created_at}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className={`text-xs sm:text-sm border px-3 py-1.5 rounded-md whitespace-nowrap flex items-center justify-center gap-2 ${
                activeAction === "approved" && isloadingSatatue
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handleStatusUpdate("approved")}
              disabled={isloadingSatatue}
            >
              {activeAction === "approved" && isloadingSatatue ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="mdi:check" className="w-4 h-4" />
                  Accept
                </>
              )}
            </button>
            <button
              className={`text-xs sm:text-sm border text-white px-3 py-1.5 rounded-md whitespace-nowrap flex items-center justify-center gap-2 ${
                activeAction === "reject" && isloadingSatatue
                  ? "bg-rose-700"
                  : "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={() => handleStatusUpdate("reject")}
              disabled={isloadingSatatue}
            >
              {activeAction === "reject" && isloadingSatatue ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="mdi:close" className="w-4 h-4" />
                  Reject
                </>
              )}
            </button>
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white rounded-xl p-6 py-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Request details
          </h3>
          <hr className="w-full border-t border-gray-100 my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10 text-sm">
            <div>
              <p className="text-gray-500">Landlord name</p>
              <p className="font-medium text-gray-900">
                {request?.landlord_name}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Tenant name</p>
              <p className="font-medium text-gray-900">{request.full_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Tenant email</p>
              <p className="font-medium text-gray-900">{request.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Tenant contact</p>
              <p className="font-medium text-gray-900">{request.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Date requested</p>
              <p className="font-medium text-gray-900">{request.created_at}</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {/* Documents Section */}
          <div className="bg-white rounded-xl p-6 py-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Uploaded Documents
            </h3>
            <hr className="w-full border-t border-gray-100 my-4" />

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center py-4">
                Failed to load documents
              </p>
            ) : uploadedDocuments ? (
              <div className="space-y-4">
                {/* Identity Document */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon
                          icon={documentIcons.identity_document}
                          className="w-6 h-6 text-blue-600"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Identity Document
                        </h4>
                        <p className="text-sm text-gray-500">
                          {uploadedDocuments.documents.identity_document
                            ? getFileType(
                                uploadedDocuments.documents.identity_document
                              )
                            : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {uploadedDocuments.documents.identity_document ? (
                        <>
                          <button
                            onClick={() =>
                              handlePreview(
                                uploadedDocuments.documents.identity_document
                              )
                            }
                            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
                          >
                            <Icon icon="eye" className="w-4 h-4" />
                            Preview
                          </button>
                          <a
                            href={uploadedDocuments.documents.identity_document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
                          >
                            <Icon icon="download" className="w-4 h-4" />
                            Download
                          </a>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 px-3 py-1.5">
                          Not uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Employment Letter */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Icon
                          icon={documentIcons.employment_letter}
                          className="w-6 h-6 text-green-600"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Employment Letter
                        </h4>
                        <p className="text-sm text-gray-500">
                          {uploadedDocuments.documents.employment_letter
                            ? getFileType(
                                uploadedDocuments.documents.employment_letter
                              )
                            : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {uploadedDocuments.documents.employment_letter ? (
                        <>
                          <button
                            onClick={() =>
                              handlePreview(
                                uploadedDocuments.documents.employment_letter
                              )
                            }
                            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
                          >
                            <Icon icon="eye" className="w-4 h-4" />
                            Preview
                          </button>
                          <a
                            href={uploadedDocuments.documents.employment_letter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
                          >
                            <Icon icon="download" className="w-4 h-4" />
                            Download
                          </a>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 px-3 py-1.5">
                          Not uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Preview Modal */}
        {previewUrl && (
          <ModalWrapper onClose={() => setPreviewUrl(null)}>
            <div className="bg-white rounded-lg p-4 w-full max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Document Preview</h3>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <Icon icon="close" className="w-6 h-6" />
                </button>
              </div>
              <div className="h-[80vh] w-full flex flex-col">
                <div className="mb-2 text-sm text-gray-500">
                  {getFileType(previewUrl)} • {previewUrl.split("/").pop()}
                </div>
                <div className="flex-1 border rounded-lg overflow-hidden bg-gray-50">
                  {previewUrl.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                      src={previewUrl}
                      className="w-full h-full"
                      title="Document Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={previewUrl}
                        alt="Document Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={previewUrl}
                    download
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Icon icon="download" className="w-5 h-5" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
