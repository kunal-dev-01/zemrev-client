import React, { useEffect } from "react";
import { CancelSvg, ErrorSvg } from "@/components/Svg/CommonSvg";

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

const AuthErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  // Auto close after 5-6 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5500); // 5.5 sec

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`w-full px-2 flex items-start justify-between mt-4  border border-red-500 rounded-lg py-2`}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 text-red-500">
          <ErrorSvg />
        </div>

        <span className="text-sm font-medium text-red-600 dark:text-red-500">
          {message}
        </span>
      </div>

      <button type="button" onClick={onClose} aria-label="close" className="w-5 h-5 text-red-500">
        <CancelSvg />
      </button>
    </div>
  );
};

export default AuthErrorAlert;
