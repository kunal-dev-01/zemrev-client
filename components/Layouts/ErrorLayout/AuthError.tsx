import React from "react";
import { ErrorIconsSvg, XSvg } from "../../Svg/AuthSvg";

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

const AuthErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="w-full bg-red-500/10 border border-red-500/40 text-red-400 dark:text-red-500 dark:bg-red-900/20 dark:border-red-700/40 py-1.5 px-2 rounded-lg flex items-center justify-between fade-in mt-4">
      <div className="flex items-center gap-4">
        <div className="w-4 h-full text-red-400 dark:text-red-500">
          <ErrorIconsSvg />
        </div>

        <span className="text-start text-sm font-medium">{message}</span>
      </div>

      <button onClick={onClose} className="p-0.5 h-full w-6 text-red-500">
        <XSvg />
      </button>
    </div>
  );
};

export default AuthErrorAlert;
