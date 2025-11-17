import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { CancelSvg } from "../../Svg/UserPageSvg";
import Input from "../../Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";
import { useState } from "react";

// Country codes with validation
const COUNTRY_CODES = [
  { code: "+1", country: "US/CA", pattern: /^\+1[2-9]\d{9}$/ },
  { code: "+44", country: "UK", pattern: /^\+44[1-9]\d{9,10}$/ },
  { code: "+91", country: "India", pattern: /^\+91[6-9]\d{9}$/ },
  { code: "+86", country: "China", pattern: /^\+86[1-9]\d{9,10}$/ },
  { code: "+81", country: "Japan", pattern: /^\+81[1-9]\d{8,9}$/ },
  { code: "+49", country: "Germany", pattern: /^\+49[1-9]\d{9,11}$/ },
  { code: "+33", country: "France", pattern: /^\+33[1-9]\d{8}$/ },
  { code: "+61", country: "Australia", pattern: /^\+61[2-9]\d{8}$/ },
  { code: "+55", country: "Brazil", pattern: /^\+55[1-9]\d{9,10}$/ },

  // 🔥 MORE COUNTRIES ADDED BELOW

  { code: "+34", country: "Spain", pattern: /^\+34[6-9]\d{8}$/ },
  { code: "+39", country: "Italy", pattern: /^\+39[3-9]\d{8,9}$/ },
  { code: "+7", country: "Russia", pattern: /^\+7[1-9]\d{9,10}$/ },
  { code: "+52", country: "Mexico", pattern: /^\+52[1-9]\d{9,10}$/ },
  { code: "+62", country: "Indonesia", pattern: /^\+62[2-9]\d{7,11}$/ },
  { code: "+63", country: "Philippines", pattern: /^\+63[2-9]\d{8,9}$/ },
  { code: "+92", country: "Pakistan", pattern: /^\+92[3-9]\d{8}$/ },
  { code: "+94", country: "Sri Lanka", pattern: /^\+94[1-9]\d{8}$/ },
  { code: "+880", country: "Bangladesh", pattern: /^\+8801[3-9]\d{8}$/ },

  { code: "+971", country: "UAE", pattern: /^\+971[2-9]\d{7,8}$/ },
  { code: "+966", country: "Saudi Arabia", pattern: /^\+9665\d{8}$/ },
  { code: "+20", country: "Egypt", pattern: /^\+20[1-9]\d{8,9}$/ },
  { code: "+27", country: "South Africa", pattern: /^\+27[1-9]\d{8}$/ },

  { code: "+82", country: "South Korea", pattern: /^\+82[1-9]\d{7,8}$/ },
  { code: "+60", country: "Malaysia", pattern: /^\+60[1-9]\d{7,9}$/ },
  { code: "+65", country: "Singapore", pattern: /^\+65[689]\d{7}$/ },

  { code: "+46", country: "Sweden", pattern: /^\+46[1-9]\d{7,10}$/ },
  { code: "+31", country: "Netherlands", pattern: /^\+31[1-9]\d{8}$/ },
  { code: "+47", country: "Norway", pattern: /^\+47[489]\d{7}$/ },
  { code: "+41", country: "Switzerland", pattern: /^\+41[1-9]\d{8}$/ },

  { code: "+90", country: "Turkey", pattern: /^\+90[1-9]\d{8,9}$/ },
  { code: "+98", country: "Iran", pattern: /^\+98[1-9]\d{8,9}$/ },

  { code: "+353", country: "Ireland", pattern: /^\+353[1-9]\d{7,8}$/ },
  { code: "+32", country: "Belgium", pattern: /^\+32[1-9]\d{7,8}$/ },
  { code: "+45", country: "Denmark", pattern: /^\+45\d{8}$/ },

  { code: "+48", country: "Poland", pattern: /^\+48[1-9]\d{8}$/ },
  { code: "+420", country: "Czech Republic", pattern: /^\+420[1-9]\d{8}$/ },
  { code: "+421", country: "Slovakia", pattern: /^\+421[1-9]\d{8}$/ },

  { code: "+234", country: "Nigeria", pattern: /^\+234[1-9]\d{8,10}$/ },
  { code: "+254", country: "Kenya", pattern: /^\+254[17]\d{7,8}$/ },
  { code: "+255", country: "Tanzania", pattern: /^\+255[1-9]\d{8,9}$/ },
];


const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+\d+$/, "Phone number must start with + and contain only digits")
    .refine((val) => {
      // Check if number matches any country code pattern
      return COUNTRY_CODES.some((country) => country.pattern.test(val));
    }, "Invalid phone number format for the selected country code"),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

const UpdatePhoneNumber = () => {
  const { updatePhoneNumber, isUpdatingPhone, userError, clearError, user } = useUser();
  const { setPhoneNumberUpdateModalOpen } = useLoginModal();
  const [selectedCode, setSelectedCode] = useState("+91");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "+91",
    },
  });

  const phoneNumber = watch("phoneNumber");

  const handleClose = () => {
    setPhoneNumberUpdateModalOpen(false);
    clearError();
  };

  const handleCodeChange = (code: string) => {
    setSelectedCode(code);
    // Keep only the digits after the current code, then add new code
    const currentDigits = phoneNumber.replace(/^\+\d+/, "");
    setValue("phoneNumber", code + currentDigits);
  };

  const onSubmit = async (data: PhoneFormData) => {
    const success = await updatePhoneNumber(data.phoneNumber);
    if (success) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center dark:bg-black/50 bg-white/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Update Phone Number
          </h2>
          <button
            onClick={handleClose}
            disabled={isUpdatingPhone}
            className="w-8 h-8 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Country Code Selector */}
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Country Code
            </label>
            <select
              value={selectedCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              disabled={isUpdatingPhone}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            >
              {COUNTRY_CODES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} ({country.country})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 9876543210"
            register={register("phoneNumber")}
            error={errors.phoneNumber}
            disabled={isUpdatingPhone}
          />

          <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 p-2 rounded-lg">
            <p className="font-semibold mb-1">Format Examples:</p>
            <ul className="space-y-0.5">
              <li>• US/CA: +1 followed by 10 digits</li>
              <li>• India: +91 followed by 10 digits (starts with 6-9)</li>
              <li>• UK: +44 followed by 10-11 digits</li>
            </ul>
          </div>

          {/* Error Alert */}
          {userError && (
            <AuthErrorAlert message={userError} onClose={clearError} />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUpdatingPhone}
              className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingPhone}
              className="flex-1 px-4 py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:bg-light/80 dark:hover:bg-dark/80 transition-colors  disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdatingPhone ? (
                <>
                  <Spinner size="sm" color="text-white" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePhoneNumber;