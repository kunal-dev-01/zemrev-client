import React from 'react';
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import UpdateAddress from "./UpdateAddress";
import UpdateFullName from "./UpdateFullName";

const UpdateManager: React.FC = () => {
  const {
    isAddressUpdateModalOpen,
    isFullNameUpdateModalOpen,
  } = useLoginModal();

  if (!isAddressUpdateModalOpen && !isFullNameUpdateModalOpen) {
    return null;
  }

  return (
    <React.Fragment>
      {isAddressUpdateModalOpen && <UpdateAddress />}
      {isFullNameUpdateModalOpen && <UpdateFullName />}
    </React.Fragment>
  );
};

export default UpdateManager;