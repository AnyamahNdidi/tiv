"use client";
import React, { useState, useEffect } from "react";

import ModalWrapper from "@/components/ModalWrapper";
import { StatusBadge } from "@/components/StatusBadge";
import { RequestData } from "../TenantVerificationDataTypes";
import VerificationStatusList from "../TenantVerificationStatusList";
import RejectionNoteModal from "../RejectNoteModal";
import { useGetVerificationDetailQuery } from "@/lib/redux/api/verificationApi";

interface RequestDetailsProps {
  request: RequestData;
  onClose: () => void;
  params: {
    id: string;
  };
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  request,
  onClose,
  params,
}) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { id } = params;
  const {
    data: verificationSummary,
    isLoading,
    error,
  } = useGetVerificationDetailQuery(id);

  console.log("request this ", verificationSummary);

  const [openSections, setOpenSections] = useState({
    identity_check: false,
    credit_check: false,
    employment_check: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = showRejectModal
      ? "hidden"
      : originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showRejectModal]);

  return (
    <>
      {showRejectModal && (
        <ModalWrapper onClose={() => setShowRejectModal(false)}>
          <RejectionNoteModal onClose={() => setShowRejectModal(false)} />
        </ModalWrapper>
      )}

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
                  Tenant Verification Request
                </h2>
                <StatusBadge status={request?.status} />
              </div>
              <p className="text-sm text-gray-500">
                Created at {request?.createdAt}
              </p>
            </div>

            {/* <div className="flex gap-2">
              <button className="px-4 py-2 rounded text-gray-700 bg-white text-sm font-semibold cursor-pointer">
                Accept
              </button>
              <button
                className="px-4 py-2 rounded bg-[#EC5F34] hover:bg-rose-600 text-white text-sm font-semibold cursor-pointer"
                onClick={() => setShowRejectModal(true)}
              >
                Reject
              </button>
            </div> */}
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
                  {verificationSummary?.landlord_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Tenant name</p>
                <p className="font-medium text-gray-900">
                  {verificationSummary?.user_info?.first_name}{" "}
                  {verificationSummary?.user_info?.last_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Tenant email</p>
                <p className="font-medium text-gray-900">
                  {verificationSummary?.user_info?.email}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Tenant contact</p>
                <p className="font-medium text-gray-900">
                  {verificationSummary?.user_info?.phone}
                </p>
              </div>
              {/* <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">
                  {verificationSummary?.gender}
                </p>
              </div> */}
              {/* <div>
                <p className="text-gray-500">Date requested</p>
                <p className="font-medium text-gray-900">
                  {verificationSummary?.dateRequested}
                </p>
              </div> */}
            </div>
          </div>

          {/* Verification Status */}
          <VerificationStatusList
            checks={verificationSummary?.verification_check}
            openSections={openSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
