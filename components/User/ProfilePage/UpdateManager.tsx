import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import UpdateAddress from "./UpdateAddress";
import UpdatePhoneNumber from "./UpdatePhoneNumber";
import UpdateFullName from "./UpdateFullName";

const UpdateManager = () => {
  const {
    isPhoneNumberUpdateModalOpen,
    isAddressUpdateModalOpen,
    isFullNameUpdateModalOpen,
  } = useLoginModal();

  return (
    <>
      {isAddressUpdateModalOpen && <UpdateAddress />}
      {isPhoneNumberUpdateModalOpen && <UpdatePhoneNumber />}
      {isFullNameUpdateModalOpen && <UpdateFullName />}
    </>
  );
};

export default UpdateManager;